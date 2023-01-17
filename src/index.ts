import {
  TokenSecurityResponse,
  AddressSecurityResponse,
  ApprovalV1SecurityResponse,
  NftSecutiryResponse,
  DappSecurityResponse,
  ApprovalV2SecurityResponse,
  NftV2SequrityResponse,
  InputDecodeResponse,
  PhishingSiteResponse,
} from "./types/responses";

import axios from "axios";

export class GoPlusLabs {
  private _endpoint;
  private _endpointv2;
  private _token;

  /**
   * @param token - Set new token as default for requests
   */
  public setToken = (token: string) => {
    this._token = token;
  };

  /**
   * @returns Get Supported blockchains
   */
  public supportedChains = () =>
    axios
      .get<{
        code: number;
        message: string;
        result: Array<{ id: string; name: string }>;
      }>(`${this._endpoint}/supported_chains`)
      .then((response) => response.data.result);

  /**
   * @param chainId - The `chian id` of the blockchain.
   * @param contract - The contract address of tokens.
   * @param auth_token - Carrying Token obtained through Get Access Token, [Get Access Token](https://docs.gopluslabs.io/reference/access-token)
   * @returns Contract Security, Trading Security, Info Security.
   */
  public tokenSecurity = (
    chainId: number | string,
    contract: string,
    auth_token?: string
  ) =>
    axios
      .get<{
        code: number;
        message: string;
        msg?: string;
        result: { [address: string]: TokenSecurityResponse };
      }>(
        `${
          this._endpoint
        }/token_security/${chainId}?contract_addresses=${contract.toLowerCase()}`,
        {
          headers: {
            Authorization: auth_token || this._token || "",
          },
        }
      )
      .then((response) => {
        const audits = response.data.result;
        if (response.data.msg || !response.data.result)
          throw new Error(
            `Error code: ${response.data.code} | ${
              response.data.msg || response.data.message
            }`
          );
        if (Array.isArray(audits))
          throw new Error("Contract audits not detected");

        const audit = audits[contract];

        if (!audit) throw new Error("Information not found");

        return { address: contract, ...audit };
      });

  /**
   * @param chainId - The `chian id` of the blockchain.
   * @param targetAddress - `Address` to be check.
   * @param token - Carrying Token obtained through Get Access Token, [Get Access Token](https://docs.gopluslabs.io/reference/access-token)
   * @returns Free, timely and comprehensive malicious address library.
   */
  public addressSecurity = (
    chainId: number | string,
    targetAddress: string,
    token?: string
  ) =>
    axios
      .get<{
        code: number;
        message: string;
        msg?: string;
        result: AddressSecurityResponse;
      }>(
        `${this._endpoint}/address_security/${targetAddress}?chain_id=${chainId}`,
        {
          headers: {
            Authorization: token || this._token || "",
          },
        }
      )
      .then((response) => {
        if (response.data.msg || !response.data.result)
          throw new Error(
            `Error code: ${response.data.code} | ${
              response.data.msg || response.data.message
            }`
          );
        const audit = response.data.result;

        return audit;
      });

  /**
   * @param chainId - The `chian id` of the blockchain.
   * @param targetContract - Contract needs to be detected
   * @param token - Carrying Token obtained through Get Access Token, [Get Access Token](https://docs.gopluslabs.io/reference/access-token)
   * @returns Detect risks of token approvals
   */
  public approvalSecurity = (
    chainId: number | string,
    targetContract: string | string[],
    token?: string
  ) =>
    axios
      .get<{
        code: number;
        message: string;
        msg?: string;
        result: ApprovalV1SecurityResponse;
      }>(
        `${this._endpoint}/approval_security/${chainId}?contract_addresses=${targetContract}`,
        {
          headers: {
            Authorization: token || this._token || "",
          },
        }
      )
      .then((response) => {
        if (response.data.msg || !response.data.result)
          throw new Error(
            `Error code: ${response.data.code} | ${
              response.data.msg || response.data.message
            }`
          );

        const audit = response.data.result;

        return audit;
      });

  /**
   * @param chainId - The `chian id` of the blockchain.
   * @param addresses - EOA addresses or address
   * @param token - Carrying Token obtained through Get Access Token, [Get Access Token](https://docs.gopluslabs.io/reference/access-token)
   * @returns Detect risks of token approvals
   */
  public erc20ApprovalSecurity = (
    chainId: number | string,
    addresses: string | string[],
    token?: string
  ) =>
    axios
      .get<{
        code: number;
        message: string;
        msg?: string;
        result: ApprovalV2SecurityResponse;
      }>(
        `${
          this._endpointv2
        }/token_approval_security/${chainId}?addresses=${addresses.toString()}`,
        {
          headers: {
            Authorization: token || this._token || "",
          },
        }
      )
      .then((response) => {
        if (response.data.msg || !response.data.result)
          throw new Error(
            `Error code: ${response.data.code} | ${
              response.data.msg || response.data.message
            }`
          );

        const audit = response.data.result;

        return audit;
      });

  /**
   * @param chainId - The `chian id` of the blockchain.
   * @param targetContract - `Address` to be check.
   * @param token - Carrying Token obtained through Get Access Token, [Get Access Token](https://docs.gopluslabs.io/reference/access-token)
   * @returns NFT authenticity detection platform
   */
  public nftSecurity = (
    chainId: number | string,
    targetContract: string | string[],
    token?: string
  ) =>
    axios
      .get<{
        code: number;
        message: string;
        msg?: string;
        result: NftSecutiryResponse;
      }>(
        `${this._endpoint}/nft_security/${chainId}?contract_addresses=${targetContract}`,
        {
          headers: {
            Authorization: token || this._token || "",
          },
        }
      )
      .then((response) => {
        if (response.data.msg || !response.data.result)
          throw new Error(
            `Error code: ${response.data.code} | ${
              response.data.msg || response.data.message
            }`
          );

        const audit = response.data.result;

        return audit;
      });

  /**
   * @param chainId - The `chian id` of the blockchain.
   * @param addresses - EOA address
   * @param token - Carrying Token obtained through Get Access Token, [Get Access Token](https://docs.gopluslabs.io/reference/access-token)
   * @returns ERC721 NFT Approval Security
   */
  public erc721ApprovalSecurity = (
    chainId: number | string,
    addresses: string | string[],
    token?: string
  ) =>
    axios
      .get<{
        code: number;
        message: string;
        msg?: string;
        result: NftV2SequrityResponse;
      }>(
        `${
          this._endpointv2
        }/nft721_approval_security/${chainId}?addresses=${addresses.toString()}`,
        {
          headers: {
            Authorization: token || this._token || "",
          },
        }
      )
      .then((response) => {
        if (response.data.msg || !response.data.result)
          throw new Error(
            `Error code: ${response.data.code} | ${
              response.data.msg || response.data.message
            }`
          );

        const audit = response.data.result;

        return audit;
      });

  /**
   * @param chainId - The `chian id` of the blockchain.
   * @param addresses - EOA address
   * @param token - Carrying Token obtained through Get Access Token, [Get Access Token](https://docs.gopluslabs.io/reference/access-token)
   * @returns ERC1155 NFT Approval Security
   */
  public erc1155ApprovalSecurity = (
    chainId: number | string,
    addresses: string | string[],
    token?: string
  ) =>
    axios
      .get<{
        code: number;
        message: string;
        msg?: string;
        result: NftV2SequrityResponse;
      }>(
        `${
          this._endpointv2
        }/nft1155_approval_security/${chainId}?addresses=${addresses.toString()}`,
        {
          headers: {
            Authorization: token || this._token || "",
          },
        }
      )
      .then((response) => {
        if (response.data.msg || !response.data.result)
          throw new Error(
            `Error code: ${response.data.code} | ${
              response.data.msg || response.data.message
            }`
          );

        const audit = response.data.result;

        return audit;
      });

  /**
   * @param url - Site Url
   * @param token - Carrying Token obtained through Get Access Token, [Get Access Token](https://docs.gopluslabs.io/reference/access-token)
   * @returns Aggregate dApp security info for quick risk alerts
   */
  public dappSecurity = (url: string, token?: string) =>
    axios
      .get<{
        code: number;
        message: string;
        msg?: string;
        result: DappSecurityResponse;
      }>(`${this._endpoint}/dapp_security?url=${url}`, {
        headers: {
          Authorization: token || this._token || "",
        },
      })
      .then((response) => {
        if (response.data.msg || !response.data.result)
          throw new Error(
            `Error code: ${response.data.code} | ${
              response.data.msg || response.data.message
            }`
          );

        const audit = response.data.result;

        return audit;
      });

  /**
   * @param url - site url
   * @param token - Carrying Token obtained through Get Access Token, [Get Access Token](https://docs.gopluslabs.io/reference/access-token)
   */
  public phishingSite = (url: string, token?: string) =>
    axios
      .get<{
        code: number;
        message: string;
        msg?: string;
        result: PhishingSiteResponse;
      }>(`${this._endpoint}/phishing_site?url=${url}`, {
        headers: {
          Authorization: token || this._token || "",
        },
      })
      .then((response) => {
        if (response.data.msg || !response.data.result)
          throw new Error(
            `Error code: ${response.data.code} | ${
              response.data.msg || response.data.message
            }`
          );

        const audit = response.data.result;

        return audit;
      });

  /**
   *
   * @param app_key - App key
   * @param time - Quest timestamp (Second)
   * @param sign - Signature
   * @returns `access_token` - API call credential, `expires_in` - The time to expiration of the API call credential (access_token), in seconds.
   */
  public getAccessToken = (app_key: string, time: string | number, sign: string) =>
    axios
      .post<{
        code: number;
        message: string;
        msg?: string;
        result: {
          access_token: string;
          expires_in: number;
        };
      }>(`${this._endpoint}/token`, {
        data: {
          app_key,
          time,
          sign,
        },
      })
      .then((response) => {
        if (response.data.msg || !response.data.result)
          throw new Error(
            `Error code: ${response.data.code} | ${
              response.data.msg || response.data.message
            }`
          );

        return response.data.result;
      });

  /**
   * @param chainId - The `chian id` of the blockchain.
   * @param data - Transaction input
   * @param contract_address - Contract address
   * @param token - Carrying Token obtained through Get Access Token, [Get Access Token](https://docs.gopluslabs.io/reference/access-token)
   * @returns decoded signature data
   */
  public inputDecode = ({
    chain_id,
    data,
    contract_address,
    token,
  }: {
    chain_id: string;
    data: string;
    contract_address?: string;
    token?: string;
  }) =>
    axios
      .post<{
        code: number;
        message: string;
        msg?: string;
        result: InputDecodeResponse;
      }>(
        `${this._endpoint}/abi/input_decode`,
        { chain_id, contract_address, data },
        {
          headers: {
            Authorization: token || this._token || "",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.msg || !response.data.result)
          throw new Error(
            `Error code: ${response.data.code} | ${
              response.data.msg || response.data.message
            }`
          );

        return response.data.result;
      });

  /**
   * @param authorizationToken - The Rate Limit is 30 calls/minute. If you require a higher limit than the available plans, please contact us to apply for access token: https://docs.gopluslabs.io/reference/support
   */
  constructor(authorizationToken?: string) {
    this._endpoint = "https://api.gopluslabs.io/api/v1";
    this._endpointv2 = "https://api.gopluslabs.io/api/v2";
    this._token = authorizationToken;
  }
}

export {
  TokenSecurityResponse,
  AddressSecurityResponse,
  ApprovalV1SecurityResponse,
  ApprovalV2SecurityResponse,
  NftSecutiryResponse,
  NftV2SequrityResponse,
  DappSecurityResponse,
  InputDecodeResponse,
  PhishingSiteResponse
};
