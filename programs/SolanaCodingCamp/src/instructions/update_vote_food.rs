use crate::schema::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct UpdateVoteFood<'info> {
    #[account(seeds = [b"seed".as_ref()], bump = vote_food_account.bump)]
    pub vote_food_account: Account<'info, VoteFood>,
}

pub fn vote_pizza(ctx: Context<UpdateVoteFood>) -> Result<()> {
    let vote_food_account: &mut Account<VoteFood> = &mut ctx.accounts.vote_food_account;
    vote_food_account.pizza += 1;
    Ok(())
}

pub fn vote_hamburger(ctx: Context<UpdateVoteFood>) -> Result<()> {
    let vote_food_account: &mut Account<VoteFood> = &mut ctx.accounts.vote_food_account;
    vote_food_account.hamburger += 1;
    Ok(())
}
