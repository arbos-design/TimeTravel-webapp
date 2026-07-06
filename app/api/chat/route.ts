import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de TimeTravelAgency, une agence de voyage temporel de luxe. Ton rôle est de conseiller les clients sur les meilleures destinations temporelles. Tu es professionnel, chaleureux, passionné d'histoire. Réponds toujours en français.

Tu connais parfaitement :
- Le Crétacé (-65 millions d'années) : dinosaures, nature préhistorique sauvage, safari T-Rex sécurisé. Prix : 15 000€/personne.
- Florence 1504 (Renaissance italienne) : ateliers avec Michel-Ange et Léonard de Vinci, soirées de la noblesse. Prix : 8 500€/personne.
- Paris 1889 (Belle Époque) : inauguration de la Tour Eiffel, Exposition Universelle, Paris industriel. Prix : 6 000€/personne.

Tu guides les clients vers la réservation sur le site. Si on te demande un danger, tu rassures sur les protocoles de sécurité temporelle.`;

const MAX_MESSAGE_LENGTH = 2000;
const MAX_MESSAGES = 20;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function validateMessages(body: unknown): ChatMessage[] | string {
  if (!body || typeof body !== "object" || !("messages" in body)) {
    return "Le champ messages est requis.";
  }

  const { messages } = body as { messages: unknown };

  if (!Array.isArray(messages) || messages.length === 0) {
    return "Le champ messages doit contenir au moins un message.";
  }

  if (messages.length > MAX_MESSAGES) {
    return `La conversation est trop longue. Maximum autorisé : ${MAX_MESSAGES} messages.`;
  }

  const sanitizedMessages: ChatMessage[] = [];

  for (const message of messages) {
    if (!message || typeof message !== "object") {
      return "Chaque message doit être un objet valide.";
    }

    const { role, content } = message as {
      role?: unknown;
      content?: unknown;
    };

    if (role !== "user" && role !== "assistant") {
      return "Chaque message doit avoir le rôle user ou assistant.";
    }

    if (typeof content !== "string" || content.trim().length === 0) {
      return "Chaque message doit contenir un texte non vide.";
    }

    if (content.length > MAX_MESSAGE_LENGTH) {
      return `Chaque message est limité à ${MAX_MESSAGE_LENGTH} caractères.`;
    }

    sanitizedMessages.push({ role, content: content.trim() });
  }

  const lastMessage = sanitizedMessages[sanitizedMessages.length - 1];
  if (lastMessage.role !== "user") {
    return "Le dernier message doit venir de l'utilisateur.";
  }

  return sanitizedMessages;
}

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function hasAnyKeyword(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

function getLastUserMessage(messages: ChatMessage[]) {
  return messages
    .filter((message) => message.role === "user")
    .at(-1)?.content ?? "";
}

function getDemoReply(messages: ChatMessage[]) {
  const question = normalizeText(getLastUserMessage(messages));
  const mentionsParis = hasAnyKeyword(question, [
    "paris",
    "1889",
    "belle epoque",
    "tour eiffel",
    "eiffel",
    "exposition universelle",
  ]);
  const mentionsCretaceous = hasAnyKeyword(question, [
    "cretace",
    "dinosaure",
    "dinosaures",
    "prehistorique",
    "nature",
    "t-rex",
    "trex",
  ]);
  const mentionsFlorence = hasAnyKeyword(question, [
    "florence",
    "renaissance",
    "michel-ange",
    "michel ange",
    "leonard",
    "art",
  ]);

  if (hasAnyKeyword(question, ["prix", "tarif", "budget", "cout", "combien"])) {
    if (mentionsParis) {
      return "Paris 1889 est notre escapade la plus accessible, à 6 000€/personne. C'est une immersion élégante dans la Belle Époque, entre Tour Eiffel, Exposition Universelle et Paris en pleine modernisation.";
    }

    if (mentionsFlorence) {
      return "Florence 1504 est proposée à 8 500€/personne. Le tarif reflète une expérience culturelle premium : ateliers d'art, rencontres Renaissance et immersion dans la vie florentine.";
    }

    if (mentionsCretaceous) {
      return "Le Crétacé est notre voyage le plus exclusif, à 15 000€/personne. L'encadrement renforcé, le safari sécurisé et les protocoles de protection expliquent ce budget plus élevé.";
    }

    return "Nos tarifs sont de 6 000€/personne pour Paris 1889, 8 500€/personne pour Florence 1504 et 15 000€/personne pour le Crétacé. Chaque formule inclut l'accompagnement temporel et les protocoles de sécurité.";
  }

  if (hasAnyKeyword(question, ["securite", "danger", "assurance", "risque", "protection", "retour"])) {
    return "Votre sécurité est notre priorité absolue. Chaque voyageur bénéficie d'un encadrement expert, d'un protocole de retour contrôlé et d'une protection chronologique adaptée à l'époque visitée.";
  }

  if (hasAnyKeyword(question, ["reservation", "reserver", "date", "formulaire", "inscription", "depart"])) {
    return "La réservation se fait depuis la section « Réserver ». Vous choisissez la destination, les dates, le nombre de voyageurs et votre niveau d'expérience, puis une référence de réservation est générée.";
  }

  if (hasAnyKeyword(question, ["conseil", "recommander", "recommande", "choisir", "quelle epoque", "destination"])) {
    return "Pour une première expérience, je recommande Paris 1889 : spectaculaire, accessible et très confortable. Pour l'art et l'élégance, Florence 1504 est idéale. Pour l'adrénaline pure, le Crétacé reste incomparable.";
  }

  if (hasAnyKeyword(question, ["duree", "temps", "voyage", "experience", "sejour"])) {
    return "Chaque voyage est pensé comme une expérience courte mais intense : assez longue pour ressentir l'époque, assez maîtrisée pour préserver votre confort et votre sécurité temporelle.";
  }

  if (mentionsParis) {
    return "Paris 1889 vous plonge dans la Belle Époque, au moment de l'Exposition Universelle et de l'inauguration de la Tour Eiffel. C'est une destination lumineuse, urbaine et parfaite pour découvrir la naissance du monde moderne.";
  }

  if (mentionsCretaceous) {
    return "Le Crétacé est notre destination la plus spectaculaire : nature primitive, dinosaures, observation scientifique et safari T-Rex sécurisé. C'est le choix idéal pour les voyageurs attirés par l'aventure.";
  }

  if (mentionsFlorence) {
    return "Florence 1504 est une immersion raffinée dans la Renaissance italienne. Vous y découvrez les ateliers des maîtres, l'effervescence artistique et l'élégance d'une ville qui réinvente l'histoire de l'art.";
  }

  if (hasAnyKeyword(question, ["agence", "timetravel", "time travel", "qui etes", "comment ca marche", "service"])) {
    return "TimeTravelAgency est une agence fictive de voyage temporel premium. Nous proposons des expériences historiques immersives, guidées et sécurisées, avec trois époques phares : Paris 1889, Florence 1504 et le Crétacé.";
  }

  return "Je peux vous guider sur nos destinations, les tarifs, la sécurité ou la réservation. Nos trois expériences phares sont Paris 1889, Florence 1504 et le Crétacé.";
}

async function callMistral(messages: ChatMessage[]): Promise<string> {
  const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
    },
    body: JSON.stringify({
      model: "mistral-small-latest",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 500,
    }),
  });

  if (!res.ok) throw new Error(`Mistral API error: ${res.status}`);
  const data = await res.json();
  return data.choices[0].message.content;
}

export async function POST(req: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          error: "Le corps de la requête doit être un JSON valide.",
          reply:
            "Votre message ne peut pas être traité tel quel. Veuillez reformuler votre demande.",
        },
        { status: 400 }
      );
    }

    const validationResult = validateMessages(body);

    if (typeof validationResult === "string") {
      return NextResponse.json(
        {
          error: validationResult,
          reply:
            "Votre message ne peut pas être traité tel quel. Veuillez reformuler votre demande.",
        },
        { status: 400 }
      );
    }

    const messages = validationResult;

    let reply: string;

    if (process.env.MISTRAL_API_KEY) {
      reply = await callMistral(messages);
    } else {
      // Local demo mode used when no Mistral key is configured.
      reply = getDemoReply(messages);
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply:
          "Je rencontre une difficulté technique. Veuillez réessayer dans un instant.",
        error: "Erreur serveur du chatbot.",
      },
      { status: 500 }
    );
  }
}
