const axios = require('axios')

let idArray = [
    "ChIJd8kca4PIxokRqW59OWceihQ",
    "ChIJo9mN1XTJxokRXw7NyvRIrB8",
    "ChIJd4XRlLXHxokR24097rPRpx0",
    "ChIJCQH7WCnGxokRAWsd3AfQj80",
    "ChIJKZI5O8MyHogRMAkx1ntablc",
    "ChIJ7x4bRCHGxokR-BVjmbZ2LWk",
    "ChIJ05tdhjTGxokReHRD0wXejyE",
    "ChIJ74Iw4oTIxokRONknVjwsA2E",
    "ChIJu35ZOcnHxokRrTUi4cDYHm8",
    "ChIJrcsBU8vHxokR4FXP2BplJks",
    "ChIJwcw7f1rGxokRlP7WsqKm6gk",
    "ChIJKcBHSE7GxokR8DA8BOQt8w4",
    "ChIJzVOaqDvGxokRPPzp8p_wIZo",
    "ChIJ0XuDVzTGxokRL_W5oMGr3u8",
    "ChIJi38nlHPHxokRahq_C3bxx78",
    "ChIJOetvJu7FxokR-jV1vd4SAgk",
    "Eh9Tb3V0aCBTdCwgUGhpbGFkZWxwaGlhLCBQQSwgVVNBIi4qLAoUChIJdQV9aTvGxokRlCNwveSN38QSFAoSCetLtdTYt8aJEcFYPozYFPWJ",
    "ChIJq707s3O3xokRXkPPxIZ-Eo0",
    "ChIJS9ygjXvGxokREtJ_5jT7A5Q",
    "ChIJv2tKaJDIxokRNjXcij0s6U4",
    "ChIJn_0OoojIxokRli62b71uVCo",
    "ChIJ_5CoRebFxokR08ApAyF2KIs",
    "ChIJUyEPZwO5xokRfaREsFG789k",
    "ChIJ1U-L54DIxokRcoW6JtzjcDM",
    "ChIJkydYBi7GxokRB1nllBaz4zk",
    "ChIJ_z3PDYTIxokRMsf2fT4MzbE"
  ]

const data = {
    placeId: ""
  }
for (let i = 0; i < idArray.length; i++) {
data.placeId = idArray[i]
try {
    axios.post('http://localhost:4000/api/locations/', data)
} catch (error) {
    console.log({error: error.message})
}
}