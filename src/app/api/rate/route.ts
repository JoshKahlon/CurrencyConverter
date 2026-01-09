
function toYMD(d: Date) {
    return d.toISOString().slice(0,10);
}

type Observation = { d: string; FXUSDCAD?: { v?: string } };

function pickLatestRate(observations: Observation[]) {
    for (let i = observations.length - 1; i >= 0; i--) {
        const obs = observations[i];
        const v = obs.FXUSDCAD?.v;
        if (v!== undefined )
        {
            const numv = Number(v)
            if (!Number.isNaN(numv)){

                return { ratedate: obs.d, rate: numv };

            }
        }
    }
    throw new Error("Could Not Find A Rate !");

    

  // loop from end to start
  // find first obs where obs.FXUSDCAD?.v exists AND converts to a number (not NaN)
  // return { rate: number, rateDate: string }
  // if none found, throw an error
}




export async function GET() {
    const end = new Date();
    const start = new Date(end);
    start.setDate(start.getDate()-10);

    
    //call Bank of Canada Api to get most current exchange rate
    const startStr = toYMD(start);
    const endStr = toYMD(end);
    const url = `https://www.bankofcanada.ca/valet/observations/FXUSDCAD/json?start_date=${startStr}&end_date=${endStr}`;
    const res = await fetch(url);
     if (!res.ok){
        throw new Error("500 JSON Error");     
    }
    const data = await res.json();


    const { rate, ratedate } = pickLatestRate(data.observations);



    return Response.json({rate,rateDate: ratedate,});
}