use crate::schema::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct InitializeVoteFood<'info> {
    #[account(init, seeds = [b"seed".as_ref()], bump, payer = user, space = Sum::SIZE)]
    pub vote_food_account: Account<'info, VoteFood>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn exec(ctx: Context<InitializeVoteFood>, vote_food_account_bump: u8) -> Result<()> {
    let vote_food_account: &mut Account<VoteFood> = &mut ctx.accounts.vote_food_account;
    vote_food_account.bump = vote_food_account_bump;
    Ok(())
}
