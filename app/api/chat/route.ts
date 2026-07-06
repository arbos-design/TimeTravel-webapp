import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de TimeTravelAgency, une agence de voyage temporel de luxe. Ton rôle est de conseiller les clients sur les meilleures destinations temporelles. Tu es professionnel, chaleureux, passionné d'histoire. Réponds toujours en français.

Tu connais parfaitement :
- Le Crétacé (-65 millions d'années) : dinosaures, nature préhistorique sauvage, safari T-Rex sécurisé. Prix : 15 000€/personne.
- Florence 1504 (Renaissance italienne) : ateliers avec Michel-Ange et Léonard de Vinci, soirées de la noblesse. Prix : 8 500€/personne.
- Paris 1889 (Belle Époque) : inauguration de la Tour Eiffel, Exposition Universelle, Paris industriel. Prix : 6 000€/personne.

Tu guides les clients vers la réservation sur le site. Si on te demande un danger, tu rassures sur les protocoles de sécurité temporelle.`;

const DEMO_RESPONSES = [
  "Bonjour ! Je suis votre guide temporel personnel. Nos trois destinations phares sont le Crétacé (-65 Ma), Florence 1504 et Paris 1889. Quelle époque vous attire le plus ?",
  "Nos protocoles de sécurité temporelle sont irréprochables. Chaque voyageur est équipé d'un bouclier chronologique et accompagné d'un guide expert. Votre retour dans le présent est garanti à 100%.",
  "Nos tarifs varient selon la destination : Le Crétacé à 15 000€/personne, Florence 1504 à 8 500€/personne, et Paris 1889 à 6 000€/personne. Tous nos forfaits incluent l'hébergement et l'accompagnement personnalisé.",
  "Pour réserver, rendez-vous dans la section 'Réserver' de notre site. Choisissez votre destination, vos dates et le nombre de voyageurs. Votre aventure temporelle commence en quelques clics !",
];

let demoIndex = 0;
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
      reply = DEMO_RESPONSES[demoIndex % DEMO_RESPONSES.length];
      demoIndex++;
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
