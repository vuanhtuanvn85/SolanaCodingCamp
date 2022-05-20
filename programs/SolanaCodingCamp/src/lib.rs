use anchor_lang::prelude::*;

declare_id!("4Q71d52Byvx9TcyhDNJXH98HPpvdiAeToyDn1tiqyhcP");

pub mod schema;
pub use schema::*;

pub mod instructions;
pub use instructions::*;

pub mod errors;
pub use errors::*;

#[program]
pub mod solana_coding_camp {
    use super::*;

    pub fn initialize_sum(ctx: Context<InitializeSum>, sum_init: u64) -> Result<()> {
        let sum_account = &mut ctx.accounts.sum_account;
        sum_account.sum = sum_init;
        Ok(())
    }

    pub fn update_sum(ctx: Context<UpdateSum>, number: u64) -> Result<()> {
        ctx.accounts.sum_account.sum += number;
        Ok(())
    }

    pub fn initialize_vote(ctx: Context<InitializeVote>, vote_account_bump: u8) -> Result<()> {
        ctx.accounts.vote_account.bump = vote_account_bump;
        Ok(())
    }

    pub fn vote_pizza(ctx: Context<Vote>) -> Result<()> {
        ctx.accounts.vote_account.pizza += 1;
        Ok(())
    }

    pub fn vote_hamburger(ctx: Context<Vote>) -> Result<()> {
        ctx.accounts.vote_account.hamburger += 1;
        Ok(())
    }
}

// Khai báo cấu trúc dữ liệu
#[account]
pub struct SumAccount {
    pub sum: u64,
}

#[account]
pub struct VottingState {
    pub pizza: u64,
    pub hamburger: u64,
    pub bump: u8,
}

// Khai báo các tài khoản sẽ tương tác
#[derive(Accounts)]
pub struct InitializeSum<'info> {
    // địa chỉ thuê
    #[account(init, payer = user, space = 8 + 8 )]
    pub sum_account: Account<'info, SumAccount>,

    // người trả phí giao dịch
    #[account(mut)]
    pub user: Signer<'info>,

    // địa chỉ chương trình giúp thuê tài khoản
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateSum<'info> {
    #[account(mut)]
    pub sum_account: Account<'info, SumAccount>,
}

#[derive(Accounts)]
pub struct InitializeVote<'info> {
    // địa chỉ thuê
    #[account(init, seeds = [b"seed".as_ref()], bump, payer = user, space = 8 + 16 + 1 )]
    pub vote_account: Account<'info, VottingState>,

    // người trả phí giao dịch
    #[account(mut)]
    pub user: Signer<'info>,

    // địa chỉ chương trình giúp thuê tài khoản
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(mut, seeds = [b"seed".as_ref()], bump = vote_account.bump)]
    vote_account: Account<'info, VottingState>,
}
