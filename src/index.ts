import axios from "axios";

import {
  TokenSecurityResponse,
  AddressSecurityResponse,
  ApprovalSecurityResponse,
  NftSecutiryResponse,
  DappSecurityResponse,
} from "./types/responses";

export class GoPlusLabsV1 {
  private _endpoint;
  private _auth;

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
   * @param contracts - The contract address or addresses of tokens, `string`.
   * @param authToken - Carrying Token obtained through Get Access Token, [Get Access Token](https://docs.gopluslabs.io/reference/access-token)
   * @returns Contract Security, Trading Security, Info Security.
   */
  public tokens = (
    chainId: number | string,
    contracts: string,
    authToken?: string
  ) =>
    axios
      .get<{
        code: number;
        message: string;
        msg?: string;
        result: Array<any> | { [address: string]: TokenSecurityResponse };
      }>(
        `${
          this._endpoint
        }/token_security/${chainId}?contract_addresses=${contracts.toLowerCase()}`,
        {
          headers: {
            Authorization: authToken || this._auth || "",
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
          throw new Error("No contract audits not detected");

        const audit = Object.keys(audits).map((contract) => {
          const audit = audits[contract];

          return {
            address: contract,
            ...audit,
          };
        })[0];

        if (!audit) throw new Error("Information not found");

        return audit;
      });

  /**
   * @param chainId - The `chian id` of the blockchain.
   * @param targetAddress - `Address` to be check.
   * @param authToken - Carrying Token obtained through Get Access Token, [Get Access Token](https://docs.gopluslabs.io/reference/access-token)
   * @returns Free, timely and comprehensive malicious address library.
   */
  public address = (
    chainId: number | string,
    targetAddress: string,
    authToken?: string
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
            Authorization: authToken || this._auth || "",
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
   * @param authToken - Carrying Token obtained through Get Access Token, [Get Access Token](https://docs.gopluslabs.io/reference/access-token)
   * @returns Detect risks of token approvals
   */
  public approval = (
    chainId: number | string,
    targetContract: string | string[],
    authToken?: string
  ) =>
    axios
      .get<{
        code: number;
        message: string;
        msg?: string;
        result: ApprovalSecurityResponse;
      }>(
        `${this._endpoint}/address_security/${targetContract}?chain_id=${chainId}`,
        {
          headers: {
            Authorization: authToken || this._auth || "",
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
   * @param authToken - Carrying Token obtained through Get Access Token, [Get Access Token](https://docs.gopluslabs.io/reference/access-token)
   * @returns NFT authenticity detection platform
   */
  public nft = (
    chainId: number | string,
    targetContract: string | string[],
    authToken?: string
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
            Authorization: authToken || this._auth || "",
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
   * @param authToken - Carrying Token obtained through Get Access Token, [Get Access Token](https://docs.gopluslabs.io/reference/access-token)
   * @returns Aggregate dApp security info for quick risk alerts
   */
  public dapp = (url: string, authToken?: string) =>
    axios
      .get<{
        code: number;
        message: string;
        msg?: string;
        result: DappSecurityResponse;
      }>(`${this._endpoint}/dapp_security?url=${url}`, {
        headers: {
          Authorization: authToken || this._auth || "",
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

  authToken = (app_key: string, time: string | number, sign: string) =>
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

  constructor(authorizationToken?: string) {
    this._endpoint = "https://api.gopluslabs.io/api/v1";
    this._auth = authorizationToken;
  }
};

export default GoPlusLabsV1;

export {
  TokenSecurityResponse,
  AddressSecurityResponse,
  ApprovalSecurityResponse,
  NftSecutiryResponse,
  DappSecurityResponse
};