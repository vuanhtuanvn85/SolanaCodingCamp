use crate::schema::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct UpdatePuppet<'info> {
    #[account(mut)]
    pub puppet: Account<'info, PuppetData>,
}

pub fn update_puppet_data(ctx: Context<UpdatePuppet>, data: u64) -> Result<()> {
    let puppet: &mut Account<PuppetData> = &mut ctx.accounts.puppet;
    puppet.data += data;
    Ok(())
}
