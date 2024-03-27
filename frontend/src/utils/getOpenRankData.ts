import axios from "axios";

const base_url = "https://graph.cast.k3l.io";

export const getUserGlobalEngagmentRanking = async (userHandle: string) => {
  const url = "/scores/global/engagement/handles";
  const input = JSON.stringify([userHandle]);
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  try {
    const data = await fetch(`${base_url}${url}`, {
      method: "POST",
      headers: headers,
      body: input,
    });

    // console.log(data);
    const res = await data.json();
    // console.log(res);

    const result = res.result[0];
    // console.log(result);

    return result;

    // {"result":[{"fid":3,"fname":"danromero.eth","username":"dwr.eth","rank":1,"score":0.026320092380046844,"percentile":100}]}%
  } catch (error) {
    console.log(error);
  }
};

export const getUserGlobalFollowingRanking = async (userHandle: string) => {
  const url = "/scores/global/following/handles";
  const input = JSON.stringify([userHandle]);
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const data = await fetch(`${base_url}${url}`, {
      method: "POST",
      headers: headers,
      body: input,
    });

    // console.log(data);
    const res = await data.json();
    // console.log(res);

    const result = res.result[0];

    return result;

    // {"result":[{"fid":3,"fname":"danromero.eth","username":"dwr.eth","rank":1,"score":0.010755518451333046,"percentile":100}]}%
    // const result = data.result
  } catch (error) {
    console.log(error);
  }
};

export const getUserEngagementNetworkGraph = async () => {
  const url = "/graph/neighbors/engagement/handles";
  const input = JSON.stringify(["dwr.eth"]);
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const data = await fetch(`${base_url}${url}`, {
      method: "POST",
      headers: headers,
      body: input,
    });

    console.log(data);
    const res = data.json();
    console.log(res);
    // {"result":[{"fid":3,"fname":"danromero.eth","username":"dwr.eth","rank":1,"score":0.010755518451333046,"percentile":100}]}%
    // const result = data.result
  } catch (error) {
    console.log(error);
  }
};

export const getUserFollowingNetworkGraph = async () => {
  const url = "/graph/neighbors/following/handles";
  const input = JSON.stringify(["dwr.eth"]);
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const data = await fetch(`${base_url}${url}`, {
      method: "POST",
      headers: headers,
      body: input,
    });

    console.log(data);
    const res = data.json();
    console.log(res);
    // {"result":[{"fid":3,"fname":"danromero.eth","username":"dwr.eth","rank":1,"score":0.010755518451333046,"percentile":100}]}%
    // const result = data.result
  } catch (error) {
    console.log(error);
  }
};
