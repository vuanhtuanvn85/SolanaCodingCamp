use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

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
}

// Khai báo cấu trúc dữ liệu
#[account]
pub struct SumAccount {
    pub sum: u64,
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
