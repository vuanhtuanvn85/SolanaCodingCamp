use crate::schema::*;
use anchor_lang::prelude::*;
use anchor_spl::{associated_token, token};
use crate::errors::ErrorCode;

#[derive(Accounts)]
pub struct UpdateProfile<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
    mut,
    seeds = [b"profile", authority.key().as_ref()], 
    bump,
  )]

    pub profile: Account<'info, Profile>,

    #[account(seeds = [b"treasurer".as_ref(), &profile.key().to_bytes()], bump)]
    /// CHECK: Just a pure account
    pub treasurer: AccountInfo<'info>,
    pub mint: Box<Account<'info, token::Mint>>,

    #[account(
    mut,
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

pub fn exec(ctx: Context<UpdateProfile>, full_name: String, birthday: i64, email: String, ipfs_link: String, ipfs_key: String) -> Result<()> {
    let profile = &mut ctx.accounts.profile;
    if full_name.as_bytes().len() > 100 {
      return err!(ErrorCode::FullNameLongThan100);
    }
    if email.as_bytes().len() > 100 {
      return err!(ErrorCode::EmailLongThan100);
    }
    if ipfs_link.as_bytes().len() > 100 {
      return err!(ErrorCode::IPFSLinkLongThan100);
    }
    if ipfs_key.as_bytes().len() > 100 {
      return err!(ErrorCode::IPFSKeyLongThan100);
    }
    profile.full_name = full_name;
    profile.birthday = birthday;
    profile.email = email;
    profile.ipfs_link = ipfs_link;
    profile.ipfs_key = ipfs_key;
    // profile.bump = *ctx.bumps.get("profile").unwrap();
    Ok(())
}
