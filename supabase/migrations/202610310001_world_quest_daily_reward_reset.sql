-- WORLD QUEST: UTC daily reward reset.
-- Applied to Supabase project afriestate as world_quest_daily_reward_reset.
create or replace function wq_private.claim_reward(p_reward_key text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $function$
declare
 v_uid uuid := auth.uid();
 v_claim_key text;
 v_coins integer;
 v_xp integer;
 v_claim_id uuid;
 v_level integer;
 v_total_xp bigint;
begin
 if v_uid is null then raise exception 'Authentication required'; end if;

 if p_reward_key = 'daily_bonus' then
   v_claim_key := 'daily_bonus:' || to_char((now() at time zone 'UTC')::date, 'YYYY-MM-DD');
   v_coins := 50; v_xp := 10;
 elsif p_reward_key in ('market','landmark','community','quiz','treasure') then
   v_claim_key := p_reward_key;
   v_coins := case p_reward_key when 'market' then 25 when 'landmark' then 20 when 'community' then 30 when 'quiz' then 15 else 40 end;
   v_xp := case p_reward_key when 'market' then 10 when 'landmark' then 15 when 'community' then 12 when 'quiz' then 8 else 20 end;
 else
   raise exception 'Unknown reward';
 end if;

 insert into public.wq_reward_claims(user_id,reward_key,coins,xp)
 values(v_uid,v_claim_key,v_coins,v_xp)
 on conflict(user_id,reward_key) do nothing
 returning id into v_claim_id;

 if v_claim_id is null then
   return jsonb_build_object('claimed',false,'reason','already_claimed');
 end if;

 insert into public.wq_profiles(user_id,coins,xp,level)
 values(v_uid,v_coins,v_xp,1)
 on conflict(user_id) do update
 set coins=public.wq_profiles.coins + excluded.coins,
     xp=public.wq_profiles.xp + excluded.xp,
     updated_at=now();

 select xp into v_total_xp from public.wq_profiles where user_id=v_uid;
 v_level := greatest(1, floor(v_total_xp::numeric / 100)::integer + 1);
 update public.wq_profiles set level=v_level, updated_at=now() where user_id=v_uid;

 insert into public.wq_ledger(user_id,claim_id,delta_coins,reason)
 values(v_uid,v_claim_id,v_coins,v_claim_key);

 return jsonb_build_object('claimed',true,'coins',v_coins,'xp',v_xp,'level',v_level,'reward_key',v_claim_key);
end;
$function$;
revoke all on function wq_private.claim_reward(text) from public, anon;
grant execute on function wq_private.claim_reward(text) to authenticated;
