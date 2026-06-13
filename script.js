let plateau;
let joueur;
let scoreNoir;
let scoreBlanc;

function nouvellePartie(){

    plateau = [
        5,5,5,5,5,5,5,
        5,5,5,5,5,5,5
    ];

    joueur = "noir";

    scoreNoir = 0;
    scoreBlanc = 0;

    afficher();
}

nouvellePartie();

function afficher(){

    const ligneBlanche =
        document.getElementById("ligneBlanche");

    const ligneNoire =
        document.getElementById("ligneNoire");

    ligneBlanche.innerHTML="";
    ligneNoire.innerHTML="";

    for(let i=13;i>=7;i--){

        let c=document.createElement("div");

        c.className="case blanc";
        c.innerHTML=plateau[i];

        c.onclick=()=>jouer(i);

        ligneBlanche.appendChild(c);
    }

    for(let i=0;i<=6;i++){

        let c=document.createElement("div");

        c.className="case noir";
        c.innerHTML=plateau[i];

        c.onclick=()=>jouer(i);

        ligneNoire.appendChild(c);
    }

    document.getElementById("joueurActuel")
        .innerHTML=
        joueur.charAt(0).toUpperCase()
        + joueur.slice(1);

    document.getElementById("scoreNoir")
        .innerHTML=scoreNoir;

    document.getElementById("scoreBlanc")
        .innerHTML=scoreBlanc;
}

function jouer(caseDepart){

    if(joueur==="noir" && caseDepart>6){
        return;
    }

    if(joueur==="blanc" && caseDepart<7){
        return;
    }

    if(plateau[caseDepart]===0){
        return;
    }

    let position=caseDepart;

    while(true){

        let graines=plateau[position];

        plateau[position]=0;

        while(graines>0){

            position=(position+1)%14;

            plateau[position]++;

            graines--;
        }

        let suivante=(position+1)%14;

        let appartientAuJoueur=false;

        if(joueur==="noir"){
            appartientAuJoueur=
            suivante>=0 && suivante<=6;
        }

        if(joueur==="blanc"){
            appartientAuJoueur=
            suivante>=7 && suivante<=13;
        }

        if(appartientAuJoueur &&
           plateau[suivante]>0){

            position=suivante;
        }
        else{
            break;
        }
    }

    capturer(position);

    verifierVictoire();

    joueur =
    joueur==="noir" ? "blanc" : "noir";

    afficher();
}

function capturer(position){

    let index=position;

    while(true){

        let adverse=
            joueur==="noir"
            ? index>=7
            : index<=6;

        if(!adverse){
            break;
        }

        if(
            plateau[index]===2 ||
            plateau[index]===3
        ){

            let gain=plateau[index];

            plateau[index]=0;

            if(joueur==="noir"){
                scoreNoir+=gain;
            }
            else{
                scoreBlanc+=gain;
            }

            index--;

            if(index<0){
                index=13;
            }
        }
        else{
            break;
        }
    }
}

function verifierVictoire(){

    if(scoreNoir>=30){

        document.getElementById("message")
            .innerHTML=
            "🏆 Victoire du joueur Noir";

        setTimeout(
            ()=>nouvellePartie(),
            5000
        );
    }

    if(scoreBlanc>=30){

        document.getElementById("message")
            .innerHTML=
            "🏆 Victoire du joueur Blanc";

        setTimeout(
            ()=>nouvellePartie(),
            5000
        );
    }
}