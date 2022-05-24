use anchor_lang::prelude::*;
use solana_coding_camp::cpi::accounts::UpdatePuppet;
use solana_coding_camp::program::SolanaCodingCamp;
use solana_coding_camp::{self, PuppetData};

declare_id!("HmbTLCmaGvZhKnn1Zfa1JVnp7vkMV4DYVxPLWBVoN65L");

#[program]
mod puppet_master {
    use super::*;

    // Có thể viết như này nhưng nên tách phần CPI setup ra khối impl như 02-a và 02-b
    pub fn pull_strings(ctx: Context<PullStrings>, data: u64) -> Result<()> {
        let cpi_program = ctx.accounts.puppet_program.to_account_info();
        let cpi_accounts = UpdatePuppet {
            puppet: ctx.accounts.puppet.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        solana_coding_camp::cpi::update_puppet_data(cpi_ctx, data)
    }

    // // 02-a
    // pub fn pull_strings(ctx: Context<PullStrings>, data: u64) -> Result<()> {
    //     solana_coding_camp::cpi::update_puppet_data(ctx.accounts.set_data_ctx(), data)
    // }
}

#[derive(Accounts)]
pub struct PullStrings<'info> {
    #[account(mut)]
    pub puppet: Account<'info, PuppetData>,
    pub puppet_program: Program<'info, SolanaCodingCamp>,
}

// // 02-b
// impl<'info> PullStrings<'info> {
//     pub fn set_data_ctx(&self) -> CpiContext<'_, '_, '_, 'info, UpdatePuppet<'info>> {
//         let cpi_program = self.puppet_program.to_account_info();
//         let cpi_accounts = UpdatePuppet {
//             puppet: self.puppet.to_account_info(),
//         };
//         CpiContext::new(cpi_program, cpi_accounts)
//     }
// }
