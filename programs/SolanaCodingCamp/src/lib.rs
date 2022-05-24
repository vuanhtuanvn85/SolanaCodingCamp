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
        initialize_sum::exec(ctx, sum_init)
    }

    pub fn update_sum(ctx: Context<UpdateSum>, number: u64) -> Result<()> {
        update_sum::exec(ctx, number)
    }

    pub fn initialize_vote_food(
        ctx: Context<InitializeVoteFood>,
        vote_food_account_bump: u8,
    ) -> Result<()> {
        initialize_vote_food::exec(ctx, vote_food_account_bump)
    }

    pub fn vote_pizza(ctx: Context<UpdateVoteFood>) -> Result<()> {
        update_vote_food::vote_pizza(ctx)
    }

    pub fn vote_hamburger(ctx: Context<UpdateVoteFood>) -> Result<()> {
        update_vote_food::vote_pizza(ctx)
    }

    pub fn initialize_candidate(
        ctx: Context<InitializeCandidate>,
        start_date: i64,
        end_date: i64,
    ) -> Result<()> {
        initialize_candidate::exec(ctx, start_date, end_date)
    }

    pub fn vote(ctx: Context<Vote>, amount: u64) -> Result<()> {
        vote::exec(ctx, amount)
    }

    pub fn close(ctx: Context<Close>) -> Result<()> {
        close::exec(ctx)
    }

    pub fn setup_game(ctx: Context<SetupGame>, player_two: Pubkey) -> Result<()> {
        setup_tic_tac_toe_game::setup_game(ctx, player_two)
    }

    pub fn play(ctx: Context<Play>, tile: Tile) -> Result<()> {
        play_tic_tac_toe_game::play(ctx, tile)
    }
}

// Khai báo cấu trúc dữ liệu
// #[account]
// pub struct SumAccount {
//     pub sum: u64,
// }

// #[account]
// pub struct VottingState {
//     pub pizza: u64,
//     pub hamburger: u64,
//     pub bump: u8,
// }

// Khai báo các tài khoản sẽ tương tác
// #[derive(Accounts)]
// pub struct InitializeSum<'info> {
//     // địa chỉ thuê
//     #[account(init, payer = user, space = 8 + 8 )]
//     pub sum_account: Account<'info, SumAccount>,

//     // người trả phí giao dịch
//     #[account(mut)]
//     pub user: Signer<'info>,

//     // địa chỉ chương trình giúp thuê tài khoản
//     pub system_program: Program<'info, System>,
// }

// #[derive(Accounts)]
// pub struct UpdateSum<'info> {
//     #[account(mut)]
//     pub sum_account: Account<'info, SumAccount>,
// }

// #[derive(Accounts)]
// pub struct InitializeVote<'info> {
//     // địa chỉ thuê
//     #[account(init, seeds = [b"seed".as_ref()], bump, payer = user, space = 8 + 16 + 1 )]
//     pub vote_account: Account<'info, VottingState>,

//     // người trả phí giao dịch
//     #[account(mut)]
//     pub user: Signer<'info>,

//     // địa chỉ chương trình giúp thuê tài khoản
//     pub system_program: Program<'info, System>,
// }

// #[derive(Accounts)]
// pub struct TestVote<'info> {
//     #[account(mut, seeds = [b"seed".as_ref()], bump = vote_account.bump)]
//     vote_account: Account<'info, VottingState>,
// }
