type CreateCheckoutUrlParams = {
  customerExternalId: string;
  requestUrl: string;
};

export async function createCheckoutUrl({
  customerExternalId,
  requestUrl,
}: CreateCheckoutUrlParams) {
  // Billing removed: Mocked checkout URL
  return new URL("/billing/success", requestUrl).toString();
};

export async function createCustomerPortalUrl({
  customerExternalId,
  requestUrl,
}: CreateCheckoutUrlParams) {
  // Billing removed: Mocked portal URL
  return new URL("/billing/success", requestUrl).toString();
};

export async function getAvailableCreditsBalance(customerExternalId: string) {
  // Billing removed: Always return a high balance
  return 999999999;
};

type IngestAiUsageParams = {
  externalCustomerId: string;
  eventId: string;
  credits: number;
};

export async function ingestAiUsage({ 
  externalCustomerId, 
  eventId, 
  credits
}: IngestAiUsageParams) {
  // Billing removed: Do nothing
  return;
};
