import { HttpResponse, http } from "msw";
import monthRequest from "./month3Request.json";
import secondMonthResponse from "./month2Request.json";

export const getMonthRequest = () =>
  http.get(
    `https://apcxumqdzampqrkljdic.supabase.co/rest/v1/payments?select=id%2Cprice%2Cpayed_at%2Ccustom_debt%2Cresponsible%28id%2Cname%29%2Cdebt%28id%2Cname%29%2Cmonth%2Cdeleted&month=eq.:monthId&deleted=eq.false`,
    ({ request }) => {
      const month = request.url.match(/month=eq.(\d+)/)?.[1];
      if (month === "3") {
        return HttpResponse.json(monthRequest);
      }
      return HttpResponse.json(secondMonthResponse);
    }
  );

export const deleteMonthRequest = () =>
  http.patch(
    "https://apcxumqdzampqrkljdic.supabase.co/rest/v1/payments?id=eq.:id",
    () => {
      return HttpResponse.json({});
    }
  );

  export const createMonthRequest = () =>
  http.post(
    "https://apcxumqdzampqrkljdic.supabase.co/rest/v1/payments?columns=%22responsible%22%2C%22debt%22%2C%22price%22%2C%22payed_at%22%2C%22custom_debt%22%2C%22month%22",
    () => {
      return HttpResponse.json({});
    }
  );

