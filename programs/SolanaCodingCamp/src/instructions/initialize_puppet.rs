use crate::schema::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct InitializePuppet<'info> {
    #[account(init, payer = user, space = PuppetData::SIZE)]
    pub puppet: Account<'info, PuppetData>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn initialize_puppet(_ctx: Context<InitializePuppet>, authority: Pubkey) -> Result<()> {
    _ctx.accounts.puppet.authority = authority;
    Ok(())
}
