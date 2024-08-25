import NeucronSDK from "neucron-sdk";

export const actions = {
  login: async ({ request }) => {
    const data = await request.formData();

    const neucron = new NeucronSDK();

    const authModule = neucron.authentication;
    const walletModule = neucron.wallet;

    const loginResponse = await authModule.login({
      email: data.get("email"),
      password: data.get("password"),
    });
    console.log(loginResponse);

    const DefaultWalletBalance = await walletModule.getWalletBalance({});

    return {
      auth: true,
      balance: DefaultWalletBalance.data.balance.summary,
    };
  },
  pay: async ({ request }) => {
    const data = await request.formData();

    const neucron = new NeucronSDK();

    const authModule = neucron.authentication;
    const walletModule = neucron.wallet;

    const loginResponse = await authModule.login({
      email: data.get("email"),
      password: data.get("password"),
    });
    // console.log(loginResponse);

    const paymail = data.get("paymail");
    const amount = Number(data.get("amount"));

    const options = {
      outputs: [
        {
          address: paymail,
          note: "gurudakshina",
          amount: amount,
        },
      ],
    };
    let payResponse;
    try {
      payResponse = await neucron.pay.txSpend(options);
      console.log(payResponse);
      return { success: true, payResponse: payResponse.data.txid };
    } catch (error) {
      console.log(error.message);
      return { success: false, payResponse: error.message };
    }
  },
};
