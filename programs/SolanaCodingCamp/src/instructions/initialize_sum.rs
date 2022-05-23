use crate::schema::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct InitializeSum<'info> {
    #[account(init, payer = user, space = Sum::SIZE)]
    pub sum_account: Account<'info, Sum>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn exec(ctx: Context<InitializeSum>, sum_init: u64) -> Result<()> {
    let sum_account: &mut Account<Sum> = &mut ctx.accounts.sum_account;
    sum_account.sum = sum_init;
    Ok(())
}
