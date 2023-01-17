export interface TokenSecurityResponse {
  /** Contract Security  */
  is_open_source: string;
  is_proxy: string;
  is_mintable?: string;
  owner_address?: string;
  can_take_back_ownership?: string;
  owner_change_balance?: string;
  hidden_owner?: string;
  selfdestruct?: string;
  external_call?: string;
  /** Trading Security */
  buy_tax?: string;
  sell_tax?: string;
  cannot_buy?: string;
  cannot_sell_all?: string;
  slippage_modifiable?: string;
  is_honeypot?: string;
  transfer_pausable?: string;
  is_blacklisted?: string;
  is_whitelisted?: string;
  is_in_dex?: string;
  dex: Array<{
    name: string;
    liquidity: string;
    pair: string;
  }>;
  is_anti_whale?: string;
  trading_cooldown?: string;
  personal_slippage_modifiable?: string;
  /** Info Security */
  token_name?: string;
  token_symbol?: string;
  holder_count?: string;
  total_supply?: string;
  holders: Array<{
    address: string;
    is_locked: string;
    tag: string | null;
    is_contract: string;
    balance: string;
    percent: string;
    locked_detail?: Array<{
      amount: string;
      end_time: string;
      opt_time: string;
    }>;
  }>;
  owner_balance?: string;
  owner_percent?: string;
  creator_address?: string;
  creator_balance?: string;
  creator_percent?: string;
  lp_holder_count?: string;
  lp_total_supply?: string;
  lp_holders: Array<{
    address: string;
    is_locked: string;
    is_contract: string;
    balance: string;
    percent: string;
    tag: string | null;
    locked_detail?: Array<{
      amount: string;
      end_time: string;
      opt_time: string;
    }>;
  }>;
  is_true_token?: string;
  is_airdrop_scam?: string;
  trust_list?: string;
  other_potential_risks?: string;
  note?: string;
}

export interface AddressSecurityResponse {
  data_source: string;
  honeypot_related_address: string;
  phishing_activities: string;
  blackmail_activities: string;
  stealing_attack: string;
  fake_kyc: string;
  malicious_mining_activities: string;
  darkweb_transactions: string;
  cybercrime: string;
  money_laundering: string;
  financial_crime: string;
  blacklist_doubt: string;
  contract_address: string;
}

export interface ApprovalV1SecurityResponse {
  contract_name: string;
  tag: string | null;
  is_contract: string;
  creator_address: string;
  deployed_time: number;
  is_open_source: string;
  is_proxy: string;
  trust_list: string;
  doubt_list: string;
  malicious_behavior: string[];
}

export interface ApprovalV2SecurityResponse {
  token_address: string;
  chain_id: string;
  token_name: string;
  token_symbol: string;
  decimals: number;
  balance: string;
  is_open_source: number;
  malicious_address: number;
  malicious_behavior: string[];
  approved_list: Array<{
    approved_contract: string;
    approved_amount: string;
    approved_time: number;
    initial_approval_time: string;
    initial_approval_hash: string;
    hash: string;
    address_info: {
      contract_name: string;
      tag: string | null;
      creator_address: string;
      is_contract: number;
      doubt_list: number;
      malicious_behavior: string[];
      deployed_time: number;
      trust_list: number;
      is_open_source: number;
    };
  }>;
}

export interface NftSecutiryResponse {
  nft_name: string;
  nft_symbol: string;
  nft_description: string | null;
  nft_erc: string;
  creator_address: string | null;
  create_block_number: number | null;
  website_url: string | null;
  discord_url: string | null;
  github_url: string | null;
  twitter_url: string | null;
  medium_url: string | null;
  telegram_url: string | null;
  nft_items: number;
  nft_owner_number: number;
  average_price_24h: number;
  lowest_price_24h: number;
  sales_24h: number;
  traded_volume_24h: number;
  total_volume: number;
  highest_price: number;
  nft_verified: string;
  same_nfts: Array<{
    create_block_number: number | null;
    nft_address: string;
    nft_name: string;
    nft_owner_number: number;
    nft_symbol: string;
  }>;
  trust_list: number;
}

export interface NftV2SequrityResponse {
  nft_address: string;
  chain_id: string;
  nft_name: string;
  nft_symbol: string;
  is_open_source: number;
  is_verified: number;
  malicious_address: number;
  malicious_behavior: string[];
  approved_list: Array<{
    approved_contract: string;
    initial_approval_time: number;
    initial_approval_hash: string;
    approved_time: number;
    hash: string;
    approved_for_all: number;
    approved_token_id: string | null;
    address_info: {
      contract_name: string;
      tag: string | null;
      creator_address: string;
      is_contract: number;
      doubt_list: number;
      malicious_behavior: string[];
      deployed_time: number;
      trust_list: number;
      is_open_source: number;
    }
  }>
}

export interface DappSecurityResponse {
  project_name?: string;
  url: string;
  is_audit: string;
  audit_info: Array<{
    audit_time: string;
    audit_link: string;
    audit_firm: string;
  }>;
  contracts_security: Array<{
    chain_id: string;
    contracts: Array<{
      contract_address: string;
      is_open_source: string;
      creator_address: string;
      malicious_contract: number;
      deployment_time: number;
      malicious_creator: number;
    }>;
  }>;
}

export interface InputDecodeResponse {
  method: string;
  params: Array<{
    type: string;
    name: string;
    input: string;
    address_info: null | Array<{
      standard: string | null;
      symbol: string;
      name: string;
      contract_name: string;
      malicious_address: number;
      is_contract: number;
    }>
  }>
}

export interface PhishingSiteResponse {
  phishing_site: number;
}
