process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import axios from "axios";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/app-render";

axios.defaults.withCredentials = true;

async function get(req: string) {
  let res;

  try {
    res = await axios.get(req);
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function post({
  url,
  body,
  header,
  useClientCookies,
}: {
  url: string;
  body: any;
  header?: any;
  useClientCookies?: RequestCookies | ReadonlyRequestCookies;
}) {
  let res;
  // console.log(
  //   url,
  //   useClientCookies?.getAll().map((c) => `${c.name}=${c.value}`)
  // );

  try {
    res = await axios.post(url, body, {
      headers: {
        ...header,
        cookie: useClientCookies?.getAll().map((c) => `${c.name}=${c.value}`),
      },
    });
    // console.log(
    //   ">>",
    //   res.config.url,
    //   res.status,
    //   res.config.headers.cookie,
    //   res.data
    // );

    return res.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

function constructUrl(service: string, path: string): string {
  if (Object.hasOwn(services, service)) {
    if (process.env.IN_KUBERNETES == "true") {
      return `${services[service]}${path}`;
    }
    return `https://comp0022.dev${path}`;
  } else {
    throw new Error("Service not found");
  }
}

const services: { [key: string]: string } = {
  auth: "http://auth-srv:3000",
  data: "http://data-source:3000",
};

export { get, post, constructUrl };
