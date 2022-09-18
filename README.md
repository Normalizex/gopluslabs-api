# gopluslabs-api
A Node.js library targeting of the [gopluslabs](https://gopluslabs.io/) api, open DeFi security service platform.
******
# Introduction
> Go+ Security is an open, permissionless, user-driven security service platform for all types of blockchain users. It supports independent security risk submitting and provides detection results dynamically via technologies including token detection, real-time risk warning, dApp contract security, and interaction security.
Go+ security engine covers Multi-chain with multi-risk dimension detection for crypto project teams and ordinary investors. It has detected more than 700,000 tokens and 2,000+ dApp contacts.
Our security data API can quickly access to third-party application platforms like public chains, non-custodial wallets, DEX, crypto data aggregators, etc. Go+ is Everyone’s Security Tool!
***
# Installing
Using npm:
```console
npm i @normalizex/gopluslabs-api
```
Using yarn:
```console
yarn add @normalizex/gopluslabs-api
```
Using jsDelivr CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/@normalizex/gopluslabs-api/dist/index.browser.min.js"></script>
```
Using unpkg CDN:
```html
<script src="https://unpkg.com/@normalizex/gopluslabs-api/dist/index.browser.min.js"></script>
```
***
# Documentation
* You can find full documentation [here](https://docs.gopluslabs.io/), this library only acts as a convenient wrapper for all requests, does not modify the request response.
***
# Usage
NodeJS (ES6)
```js
import { GoPlusLabsV1 } from '@normalizex/gopluslabs-api';
const goPlus = new GoPlusLabsV1();
```
NodeJS (CommonJS)
```js
const GoPlusLabs = require('@normalizex/gopluslabs-api').default;
const goPlus = new GoPlusLabs();
```
Browser:
```html
<script type="text/javascript">
const goPlus = new GoPlusLabs();
</script>
```

# Example
```js
goPlus.supportedChains().then((chains) => {
    /**
        { id: '1', name: 'eth' },
        { id: '56', name: 'bsc' },
        { id: '42161', name: 'arbitrum' },
        { id: '137', name: 'polygon' },
        ...Others
    */
});
```

#### Token Security API
UI Example: [URL](https://gopluslabs.io/token-security-api)
```js
const chain = 56;//Binance Smart Chain
const ITM = '0x64c37c3d6b5ff0fdea26eec0c8b6de487105291c';//SCAM TOKEN!
goPlus.tokens(chain, ITM).then((token) => {
    /**
        {
            address: '0x64c37c3d6b5ff0fdea26eec0c8b6de487105291c',
            buy_tax: '0',
            cannot_buy: '0',
⚠️SCAM  --> sell_tax: '1', <---- 100% SELL TAX.⚠️
            total_supply: '100000000.000000000000000000',
            token_name: 'ITHEUM',
            token_symbol: 'ITM'
            ...etc data...
        }
    */
  });

const TEDDY = '0x10f6f2b97f3ab29583d9d38babf2994df7220c21';//-99.9% 'Soft' Rug Pull.
goPlus.tokens(chain, TEDDY).then((token) => {
    /**
        {
            address: '0x10f6f2b97f3ab29583d9d38babf2994df7220c21',
          ⚠️hidden_owner: '1',⚠️ <- The token has a hidden owner address.For contract with a hidden owner, developer can still manipulate the contract even if the ownership has been abandoned.
            owner_address: '0xdbE8eF79A1A7b57fbb73048192eDF6427e8A5552',
            buy_tax: '0',
            can_take_back_ownership: '0',
            cannot_buy: '0',
            cannot_sell_all: '0',
            creator_address: '0xabcd756f71564a1c24e4c8f429580c4a6dcfbccc',
            creator_balance: '0',
            creator_percent: 'NaN',
            dex: [ Object ],
            external_call: '0',
            holder_count: '57472',
            holders: [ Object ],
            is_anti_whale: '0',
            is_blacklisted: '0',
            is_honeypot: '0',
            is_in_dex: '1',
          ⚠️is_mintable: '1'⚠️,
          ^^^^^^^^^^^^^^^^^^^^^^

          ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
          The contract may contain additional issuance
          functions, which could maybe generate a large number
          of tokens, resulting in significant fluctuations in
          token prices. It is recommended to confirm with the 
          project team whether it complies with the token 
          issuance instructions.

          But, in this case, a large number was printed.
          tokens and thrown into the market.
          Addresses connected to the project exchanged TEDDY 
          for wrapped BNB, which in turn was exchanged for 
          over 10,000 BNB and 2 million BUSD
          ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️

            is_open_source: '1',
            is_proxy: '0',
            is_whitelisted: '0',
            lp_holder_count: '48',
            lp_holders: [ Object ],
            lp_total_supply: '26582692.065667668217154110',
          ⚠️owner_balance: '1'⚠️,
            owner_change_balance: '0',
          ⚠️owner_percent: 'Infinity'⚠️,
            personal_slippage_modifiable: '0',
            selfdestruct: '0',
            sell_tax: '0',
            slippage_modifiable: '0',
            total_supply: '0',
            trading_cooldown: '0',
            transfer_pausable: '0',
            token_name: 'TeddyDoge',
            token_symbol: 'TEDDY'
        }
    */
  });
```

#### Malicious Address API
UI Example: [URL](https://gopluslabs.io/aml-api)
```js
const chain = 56;//Binance Smart Chain
const address = '0x0D213F3833fd17690e7FfF9b1Aa00578d78b6f44';//SCAM TOKEN!
goPlus.address(chain, address).then((info) => {
    /* {
        blacklist_doubt: '0',
        honeypot_related_address: '0',
        data_source: '',
        contract_address: '0',
        phishing_activities: '0',
        blackmail_activities: '0',
        stealing_attack: '0',
        fake_kyc: '0',
        malicious_mining_activities: '0',
        darkweb_transactions: '0',
        cybercrime: '0',
        money_laundering: '0',
        financial_crime: '0'
    } */
});
```
#### NFT Security API
UI Example: [URL](https://gopluslabs.io/nft-security-api)
```js
goPlus.nft(56, '0xee24b9872022c7770CCC828d856224416CBa005f').then((info) => {
    /** {
        create_block_number: 18506627,
        nft_address: '0xee24b9872022c7770ccc828d856224416cba005f',
        nft_symbol: 'TPH',
        nft_name: 'Tribalpunk Hero',
        nft_verified: 0,
        nft_open_source: 1,
        nft_proxy: 0,
        malicious_nft_contract: 0,
        nft_description: null,
        website_url: null,
        twitter_url: null,
        medium_url: null,
        github_url: null,
        telegram_url: null,
        discord_url: null,
        nft_erc: 'erc721',
        nft_owner_number: 113,
        nft_items: 35970,
        creator_address: '0xb6eb22a285699f86bb0634c41cb4cdeadfc713df',
        owner_address: '',
        trust_list: 0,
        average_price_24h: 0,
        highest_price: 0.5,
        lowest_price_24h: null,
        sales_24h: 0,
        total_volume: 2.8253,
        traded_volume_24h: 0,
        same_nfts: null 
    } */
})
```
#### Approval Security API
UI Example: [URL](https://gopluslabs.io/approval-security-api)
```js
goPlus.approval(56, "0x7bd75b1b8f2cfce01bd97b3661c0a2b78a4c6ca0").then((approve) => {
    /**
        blacklist_doubt: '0',
        honeypot_related_address: '0',
        data_source: '',
        contract_address: '1',
        phishing_activities: '0',
        blackmail_activities: '0',
        stealing_attack: '0',
        fake_kyc: '0',
        malicious_mining_activities: '0',
        darkweb_transactions: '0',
        cybercrime: '0',
        money_laundering: '0',
        financial_crime: '0' 
    */
});
```
#### dApp Security Info
UI Example: [URL](https://gopluslabs.io/dapp-security-info)
```js
goPlus.dapp('https://for.tube').then(site => {
    /** {
        project_name: 'ForTube',
        url: 'https://www.for.tube',
        is_audit: 1,
        audit_info: [
            {
            audit_time: '2021.03.26',
            audit_link: 'https://for.tube/PeckShield-Audit-Report-ForTubeV3-v1.0.pdf',
            audit_firm: 'PeckShield'
            }
        ],
        contracts_security: [
            { chain_id: 1, contracts: [Array] },
            { chain_id: 56, contracts: [Array] }
        ]
    } */
})
```