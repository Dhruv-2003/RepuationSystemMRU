// Neynar

// We have to get the likes , recast , and other interaction by the user

export const getUserCasts = async (userFid: number) => {
  const url = `https://api.neynar.com/v1/farcaster/casts?fid=${userFid}&limit=150`;
  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    api_key: `${process.env.NEYNAR_API_KEY}`,
  };

  try {
    const data = await fetch(`${url}`, {
      headers,
    });

    // console.log(data);
    const res = await data.json();
    // console.log(res);
    const result = res.result.casts;
    // console.log(result);
    return result;
    // {"result":[{"fid":3,"fname":"danromero.eth","username":"dwr.eth","rank":1,"score":0.010755518451333046,"percentile":100}]}%
    // const result = data.result
  } catch (error) {
    console.log(error);
  }
};

export const getUserReactions = async (userFid: number) => {
  const url = `https://api.neynar.com/v2/farcaster/reactions/user?fid=${userFid}&type=all&limit=100`;
  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    api_key: `${process.env.NEYNAR_API_KEY}`,
  };

  try {
    const data = await fetch(`${url}`, {
      headers,
    });

    console.log(data);
    const res = await data.json();
    console.log(res);
    const result = res.result.casts;
    return result;
    // {"result":[{"fid":3,"fname":"danromero.eth","username":"dwr.eth","rank":1,"score":0.010755518451333046,"percentile":100}]}%
    // const result = data.result
  } catch (error) {
    console.log(error);
  }
};

export const getUserLikes = async (userFid: number) => {
  const url = `https://api.neynar.com/v2/farcaster/reactions/user?fid=${userFid}&type=likes&limit=100`;
  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    api_key: `${process.env.NEYNAR_API_KEY}`,
  };

  try {
    const data = await fetch(`${url}`, {
      headers,
    });

    // console.log(data);
    const res = await data.json();
    // console.log(res);
    const result = res.reactions;
    return result;
    // {"result":[{"fid":3,"fname":"danromero.eth","username":"dwr.eth","rank":1,"score":0.010755518451333046,"percentile":100}]}%
    // const result = data.result
  } catch (error) {
    console.log(error);
  }
};

export const getUserRecasts = async (userFid: number) => {
  const url = `https://api.neynar.com/v2/farcaster/reactions/user?fid=${userFid}&type=recasts&limit=100`;
  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    api_key: `${process.env.NEYNAR_API_KEY}`,
  };

  try {
    const data = await fetch(`${url}`, {
      headers,
    });

    // console.log(data);
    const res = await data.json();
    // console.log(res);
    const result = res.reactions;
    return result;
    // {"result":[{"fid":3,"fname":"danromero.eth","username":"dwr.eth","rank":1,"score":0.010755518451333046,"percentile":100}]}%
    // const result = data.result
  } catch (error) {
    console.log(error);
  }
};
