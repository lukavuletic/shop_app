Project Evaluator
===================

Login (GET)
   

     {"email" : string, "password" : string(md5) token: string}

Zdatci tekst zadatka (GET)

    {"id" : number, "zadatak" : string, "text-zadatka" : text(string)}

Svi zadatci (GET)

    {"zadatak" : string, "text-zadatka" : text(string)}

Zadatci(POST)

    id: number
    text-zadatka: string
    rjesenje-zadatka: text

