
function getDomain(domain: string){
  if(process.env.KUBERNETES){
    return domain;
  }
  return "https://comp0022.dev";
}

async function get(domain: string, req: string) {
  try{
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0'; 
    const res = await fetch(getDomain(domain) + req, {next: {revalidate: 60}});
    if (!res.ok) {
      throw new Error("Failed to reach server");
    }
  
    return res.json();

  }catch(err){
    console.log(err);
  }
  return {};
}

async function post(domain: string,req: string) {
  try{
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0'; 
    const res = await fetch(getDomain(domain) + req,
      {
        method: 'POST'
      });
    if (!res.ok) {
      throw new Error("Failed to reach server");
    }
  
    return res.json();

  }catch(err){
    console.log(err);
  }
  return {};
}

export { get, post };
