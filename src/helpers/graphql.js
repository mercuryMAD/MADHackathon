const endpoint = 'https://api.thegraph.com/subgraphs/name/decentraland/marketplace';
const liteendoint = 'https://api.thegraph.com/subgraphs/name/boyuanx/decentraland-lite';
export const MAD_ADDRESS = '0x9D4DdDbe95192Ad8bE81ee88E021c9Eaf575BAf8';

// Estate is a collection of parcels
function generateDecentralandEstateIdQuery(owner) {
    
  const estateIdQuery = `{
      nfts(where:{ category: estate, owner: "${owner}"  }) {
        tokenId
        name
      }
    }
  `;
  return estateIdQuery;
}

// A parcel is a chunk of land
function generateDecentralandParcelIdQuery(owner) {
  const parcelIdQuery = `{
      nfts(where:{ category: parcel, owner: "${owner}"  }) {
        tokenId
      }
    }
  `;
  return parcelIdQuery;
}

// Get detailed info about an estate
function generateDecentralandEstateInfoQuery(id) {
    
  const estateInfoQuery = `{
      nfts(where:{ tokenId: "${id}"  }) {
          tokenId
          name
          image
      }
    }`;
  
    return estateInfoQuery;
}

// Get detailed parcel info
function generateDecentralandParcelInfoQuery(id) {
    
  const parcelInfoQuery = `{
      nfts(where:{ tokenId: "${id}"  }) {
          tokenId
          name
          image
          parcel {
              x
              y
          }
      }
    }`;
  
    return parcelInfoQuery;
}

// Get the updateOperator value of a parcel
function generateParcelUpdateOperatorQuery(parcelId) {
  const parcelQuery = `{
    lands(where: {id: "${parcelId}"}) {
      updateOperator
    }
  }`;

  return parcelQuery;
}

// Get the updateOperator value of an estate
function generateEstateUpdateOperatorQuery(estateId) {
  const estateQuery = `{
    estates(where: {id: "${estateId}"}) {
      updateOperator
    }
  }`;

  return estateQuery;
}

export const getDecentralandParcels = async (parcelContract, owner) => {
  if(!owner || !parcelContract) {
    return [];
  }

  let ret = null;
  await parcelContract.tokensOf(owner).then(async (res) => {
    ret = [];
    if(res) {
      for(let nft of res) {
        let tmp = await getDecentralandParcelData(nft);
        tmp.updateOperator = await getDecentralandParcelUpdateOperator(parcelContract, nft); // True means we have delegation (show Cancel, Claim Profit), false means we don't have delegation (show Lease)
        ret.push(tmp);
      }
    }
  });

  return ret;
}

export const getDecentralandEstates = async (estateContract, owner) => {
  if(!owner || !estateContract) {
    return [];
  }

  let ret = null;
  await estateContract.balanceOf(owner).then(async (res) => {
    if(!res) {
      return [];
    }

    let ret2 = []

    res = res.toString();
    for(let idx = 0; idx < res; idx++) {
      let tmp = await estateContract.tokenOfOwnerByIndex(owner, idx);
      ret2.push(tmp.toString());
    }
    return ret2;
  }).then(async (result) => {
    ret = [];
    if(result) {
      for(let nft of result) {
        let tmp = await getDecentralandEstateData(nft);
        tmp.name = ((await estateContract.getMetadata(nft)).split(",")[1]).slice(1, -1);
        tmp.updateOperator = await getDecentralandEstateUpdateOperator(estateContract, tmp.parcels[0].tokenId); // True means we have delegation (show Cancel, Claim Profit), false means we don't have delegation (show Lease)
        ret.push(tmp);
      }
    }
  });
  // await fetch(endpoint, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     query: generateEstateIdQuery(owner),
  //   }),
  // }).then((res) => res.json()).then(async (result) => {
  //   ret = [];
  //   if(result.data.nfts) {
  //     for(let nft of result.data.nfts) {
  //       let tmp = await getEstateData(nft.tokenId);
  //       tmp.name = nft.name;
  //       tmp.updateOperator = await getEstateUpdateOperator(nft.tokenId); // True means we have delegation (show Cancel, Claim Profit), false means we don't have delegation (show Lease)
  //       ret.push(tmp);
  //     }
  //   }
  // });

  return ret;
}


export const getDecentralandParcelData = async (parcelId) => {
  if(!parcelId) {
    return {type: 'parcel', image: '', name: null, parcel: {x: null, y: null}, tokenId: parcelId};
  }

  let ret = null;
  await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: generateDecentralandParcelInfoQuery(parcelId),
    }),
  }).then((res) => res.json()).then(async (result) => {
    if(result.data.nfts) {
      result.data.nfts[0].type = 'parcel';
      ret = result.data.nfts[0];
    } else {
      ret = {type: 'parcel', image: '', name: null, parcel: {x: null, y: null}, tokenId: parcelId};
    }
  });

  return ret;
}

export const getDecentralandEstateData = async (estateId) => {
  if(!estateId) {
    return {type: 'estate', image: '', name: null, parcel: null, tokenId: estateId};
  }

  let ret = null;
  await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: generateDecentralandParcelInfoQuery(estateId),
    }),
  }).then((res) => res.json()).then(async (result) => {
    if(result.data.nfts) {
      ret = {
        type: 'estate',
        tokenId: estateId,
        name: null,
        image: result.data.nfts[0].image,
        parcels: result.data.nfts,
      }
    } else {
      ret = {type: 'estate', image: '', name: null, parcels: null, tokenId: estateId};
    }
  });

  return ret;
}

export const getDecentralandParcelUpdateOperator = async (parcelContract, parcelId) => {
  if(!parcelId || !parcelContract) {
    return null;
  }

  let ret = null;
  await parcelContract.updateOperator(parcelId).then((res) => {
    if(!res) {
      ret = false;
    } else {
      ret = res === MAD_ADDRESS;
    }
  })
  // await fetch(liteendoint, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     query: generateParcelUpdateOperatorQuery(parcelId),
  //   }),
  // }).then((res) => res.json()).then(async (result) => {
  //   if(result.data && result.data.lands) {
  //     ret = result.data.lands[0].updateOperator === MAD_ADDRESS;
  //   } else {
  //     ret = false;
  //   }
  // });

  return ret;
}

export const getDecentralandEstateUpdateOperator = async (estateContract, estateId) => {
  if(!estateId || !estateContract) {
    return false;
  }

  let ret = false;
  await estateContract.updateOperator(estateId).then((res) => {
    if(!res) {
      ret = false;
    } else {
      ret = res === MAD_ADDRESS;
    }
  })

  // await fetch(liteendoint, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     query: generateEstateUpdateOperatorQuery(estateId),
  //   }),
  // }).then((res) => res.json()).then(async (result) => {
  //   if(result.data && result.data.estates) {
  //     ret = result.data.estates[0].updateOperator === MAD_ADDRESS;
  //   } else {
  //     ret = false;
  //   }
  // });

  return ret;
}