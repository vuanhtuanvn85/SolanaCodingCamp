use crate::schema::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct UpdateSum<'info> {
    #[account(mut)]
    pub sum_account: Account<'info, Sum>,
}

pub fn exec(ctx: Context<UpdateSum>, number: u64) -> Result<()> {
    let sum_account: &mut Account<Sum> = &mut ctx.accounts.sum_account;
    sum_account.sum += number;
    Ok(())
}
