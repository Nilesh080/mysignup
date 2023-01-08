document
  .getElementById("form-register")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const failureUrl = "/pages/failure.html";
    const successUrl = "/pages/success.html";
    const url = "https://us13.api.mailchimp.com/3.0/lists/7dae4f9704";
    const formData = new FormData(document.forms["form-register"]);
    const data = {
      members: [
        {
          email_address: formData.getAll("email")[0],
          status: "subscribed",
          merge_fields: {
            FNAME: formData.getAll("fName")[0],
            LNAME: formData.getAll("lName")[0],
          },
        },
      ],
    };

    const response = await fetch(url, {
      method: "post",
      headers: {
        Authorization: "Bearer b53c58025f0bdac56cb53ea1e488f696-us13",
        "Content-Type": "application/json",
      },
      body: data,
    }).catch((error) => {
      document.location.href = failureUrl;
    });

    if (response.status == 200) document.location.href = successUrl;
    document.location.href = failureUrl;
  });
