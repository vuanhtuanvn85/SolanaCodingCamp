use crate::schema::*;
use anchor_lang::prelude::*;
use anchor_spl::{associated_token, token};

#[derive(Accounts)]
pub struct InitializeProfile<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
    init,
    payer = authority,
    space = Profile::SIZE,
  )]
    pub profile: Account<'info, Profile>,

    #[account(seeds = [b"treasurer".as_ref(), &profile.key().to_bytes()], bump)]
    /// CHECK: Just a pure account
    pub treasurer: AccountInfo<'info>,
    pub mint: Box<Account<'info, token::Mint>>,

    #[account(
    init,
    payer = authority,
    associated_token::mint = mint,
    associated_token::authority = treasurer
  )]
    pub profile_token_account: Account<'info, token::TokenAccount>,

    // System Program Address
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, token::Token>,
    pub associated_token_program: Program<'info, associated_token::AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn exec(ctx: Context<InitializeProfile>, full_name: String, birthday: i64, email: String, ipfs_link: String, ipfs_key: String) -> Result<()> {
    let profile = &mut ctx.accounts.profile;
    profile.full_name = full_name;
    profile.birthday = birthday;
    profile.email = email;
    profile.is_email_verified = false;
    profile.ipfs_link = ipfs_link;
    profile.ipfs_key = ipfs_key;
    Ok(())
}
