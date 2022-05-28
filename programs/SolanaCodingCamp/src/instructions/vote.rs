use crate::errors::ErrorCode;
use crate::schema::*;
use anchor_lang::prelude::*;
use anchor_spl::{associated_token, token};

#[derive(Accounts)]
pub struct Vote<'info> {
    // TODO: Customize account address
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(mut)]
    // Profile accounts
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

    #[account(
    init_if_needed,
    payer = authority,
    space = Ballot::SIZE,
    seeds = [b"ballot".as_ref(), &profile.key().to_bytes(), &authority.key().to_bytes()], 
    bump
  )]
    pub ballot: Account<'info, Ballot>,

    #[account(
    mut,
    associated_token::mint = mint,
    associated_token::authority = authority
  )]
    pub voter_token_account: Account<'info, token::TokenAccount>,

    // System Program Address
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, token::Token>,
    pub associated_token_program: Program<'info, associated_token::AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn exec(ctx: Context<Vote>, amount: u64, is_positive: bool) -> Result<()> {
    let profile = &mut ctx.accounts.profile;
    let ballot = &mut ctx.accounts.ballot;

    let now = Clock::get().unwrap().unix_timestamp;
    // if now < profile.start_time || now > candidate.start_date {       KIEM TRA LẠI THOI GIAN TINH GIAY HAY MS
    if now < profile.start_time {
        return err!(ErrorCode::NotActiveCandidate);
    }

    let transfer_ctx = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        token::Transfer {
            from: ctx.accounts.voter_token_account.to_account_info(),
            to: ctx.accounts.profile_token_account.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        },
    );
    token::transfer(transfer_ctx, amount)?;

    profile.ballots.push(*ballot.to_account_info().key);
    if is_positive {
        profile.sum_positive += amount;
    } else {
        profile.sum_negative += amount;
    }

    ballot.voter = ctx.accounts.authority.key();
    ballot.profile = profile.key();
    ballot.amount += amount;

    Ok(())
}





// use crate::schema::*;
// use anchor_lang::prelude::*;
// use anchor_spl::{associated_token, token};
// use crate::errors::ErrorCode;

// #[derive(Accounts)]
// pub struct Vote<'info> {
//     #[account(
//       mut,
//     //   has_one=profile_owner,
//       seeds=[
//         b"profile", profile_owner.key().as_ref(),
//       ],
//       bump)]
//     pub profile: Account<'info, Profile>,
    
//     /// CHECK: Just a pure account
//     pub profile_owner: AccountInfo<'info>,

//     #[account(init, payer=user, space=Ballot::SIZE)]
//     pub ballot: Account<'info, Ballot>,

//     #[account(mut)]
//     pub user: Signer<'info>,
//     pub system_program: Program<'info, System>,
// }

// pub fn exec(
//     ctx: Context<Vote>,
//     amount: u64,
// ) -> Result<()> {
//     // let user = &ctx.accounts.user;
//     // let profile = &mut ctx.accounts.profile;
//     // let ballot = &mut ctx.accounts.ballot;

//     // // Check that the ref_checkers of profile isn't already full.
//     // if profile.ref_checkers.len() >= 10 {
//     //     return err!(ErrorCode::ListFull);
//     // }

//     // profile.ref_checkers.push(*ballot.to_account_info().key);
//     // profile.sum_positive += amount;
//     // ballot.amount = amount;
//     // ballot.voter = *user.to_account_info().key;







//     // // Move the bounty to the account. We account for the rent amount
//     // // that Anchor's init already transferred into the account.
//     // let account_lamports = **item.to_account_info().lamports.borrow();
//     // let transfer_amount = bounty
//     //     .checked_sub(account_lamports)
//     //     .ok_or(TodoListError::BountyTooSmall)?;

//     // if transfer_amount > 0 {
//     //     invoke(
//     //         &transfer(
//     //             user.to_account_info().key,
//     //             item.to_account_info().key,
//     //             transfer_amount,
//     //         ),
//     //         &[
//     //             user.to_account_info(),
//     //             item.to_account_info(),
//     //             ctx.accounts.system_program.to_account_info(),
//     //         ],
//     //     )?;
//     // }

//     Ok(())
// }