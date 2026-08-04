/**
 * /intake — copy source for the intake-session application page.
 *
 * Every fact below comes from Alina's own outreach script (supplied 2026-08-04):
 * the intake session carries no charge, runs 30 minutes with a qualified psychologist,
 * in person at the clinic or online, and sessions after it run AED 975 to 1,500
 * depending on the focus of the treatment. Nothing on this page states anything
 * her script does not.
 *
 * The voice is hers too. Her arguments in order: most people arrive with anxiety,
 * stress, or something heavier they have carried a while; the hesitation is being
 * asked to open up to a person they have never talked to; a bad experience with a
 * psychologist makes trusting someone new harder; so the first step costs nothing
 * and commits you to nothing.
 */

export const INTAKE = {
  priceIntake: 'No charge',
  priceRange: 'AED 975 to 1,500',
  duration: '30 minutes',
} as const;

export const HERO_INTAKE = {
  h1: 'We get to know you before you pay.',
  subBullets: [
    '<strong class="font-semibold text-navy">A 30-minute intake session</strong> with <strong class="font-semibold text-navy">a qualified clinical psychologist</strong>, in person at the clinic or online.',
    'You talk through what is going on, then hear <strong class="font-semibold text-navy">honestly whether we can help</strong> and <strong class="font-semibold text-navy">which of our specialists fits you</strong>.',
  ],
  formEyebrow: 'Apply here',
} as const;

// A note from Alina. Adapted from her own message so it reads to somebody who has
// not filled anything in yet. Her arguments and phrasing, nothing added.
export const ALINA_NOTE = {
  eyebrow: 'A note from our clinical psychologist',
  headline: 'Why we get to know you first',
  paragraphs: [
    'Most people who reach out to us are dealing with anxiety, stress, or something heavier they have been carrying for a while. Almost everyone has the same hesitation before they get in touch.',
    'You are being asked to open up about your inner problems to a person you have never talked to. That is a big ask. Some people have had bad experiences with psychologists before, which makes trusting someone new even harder.',
    'So the first step here costs nothing. You come in, or we meet online, and you talk through what is going on. I tell you honestly whether we can help and which of our specialists would be the right fit for you. You are not committing to anything by coming in.',
  ],
  attribution: 'Alina Vasilache',
  attributionRole: 'Clinical Psychologist, Potentia Clinics',
  photo: '/images/alina-vasilache.webp',
  photoAlt: 'Alina Vasilache, clinical psychologist at Potentia Clinics in Dubai.',
} as const;

export const EXPLAINER = {
  headline: 'What happens in the intake session',
  beats: [
    {
      n: 1,
      title: 'You talk, nobody rushes you',
      body: 'What is going on, how long you have been carrying it, and what you have already tried. In person at the clinic or online, whichever is easier for you.',
      icon: 'listen',
    },
    {
      n: 2,
      title: 'A qualified psychologist listens',
      body: 'Not an assistant and not a call centre. You are sitting with a clinical psychologist for the whole 30 minutes.',
      icon: 'question',
    },
    {
      n: 3,
      title: 'You hear honestly whether we can help',
      body: 'If this is something we work with, you hear that. If somebody else would serve you better, you hear that too.',
      icon: 'read',
    },
    {
      n: 4,
      title: 'You find out who fits you',
      body: 'Which of our specialists suits your situation, and what continuing would look like. Then you decide, in your own time.',
      icon: 'decide',
    },
  ],
  takeawayHeadline: 'What you leave with',
  takeaways: [
    'An honest answer on whether we can help you',
    'The name of the specialist who fits your situation',
    'A clear picture of what continuing would involve',
    'No commitment, and nothing to pay for the intake',
  ],
} as const;

export const SITUATIONS_INTAKE = {
  headline: 'Sound familiar?',
  items: [
    {
      title: 'You have been carrying it a while.',
      body: 'Anxiety, stress, or something heavier that has been there for months. <strong class="font-semibold text-navy">The thought of doing something about it comes back</strong>, and every time it gets parked again.',
      icon: 'waiting',
    },
    {
      title: 'A psychologist let you down before.',
      body: 'You sat with somebody who was not the right fit and decided the whole thing was not for you. <strong class="font-semibold text-navy">Trusting someone new after that is harder</strong>, which is exactly why the first meeting costs nothing.',
      icon: 'fit',
    },
    {
      title: 'Opening up to a stranger feels like a lot.',
      body: 'Being asked to talk about your inner problems with somebody you have never met is a big ask. <strong class="font-semibold text-navy">Half an hour is enough to see whether this person is someone you can talk to</strong>.',
      icon: 'doubt',
    },
    {
      title: 'You want to know the cost before, not after.',
      body: 'Nobody wants to find out what it runs to once they have already opened up. <strong class="font-semibold text-navy">The numbers are on this page</strong>, and you hear them again before anything is booked.',
      icon: 'cost',
    },
  ],
  ctaLabel: 'Book my intake session',
} as const;

export const PRICING_INTAKE = {
  headline: 'What it costs, before you ask',
  body: 'So there are no surprises later. The intake session is there for us to understand your situation, and it costs you nothing. If you decide to continue afterwards, regular sessions run between AED 975 and AED 1,500, depending on what the treatment focuses on. You hear the exact number for your situation in the intake, before anything is booked.',
  rows: [
    {
      label: 'Intake session, 30 minutes',
      value: 'No charge',
      note: 'In person at the clinic or online, with a clinical psychologist',
      highlight: true,
    },
    {
      label: 'Regular sessions afterwards',
      value: INTAKE.priceRange,
      note: 'Per session, depending on the focus of the treatment',
      highlight: false,
    },
    {
      label: 'Insurance',
      value: 'Pay and claim',
      note: 'You pay at the clinic and we give you a receipt to submit to your insurer',
      highlight: false,
    },
  ],
  refusals: [
    'You are not committing to anything by coming in.',
    'We do not direct bill insurance, so if that is a must for you, we are not the right clinic.',
  ],
} as const;

export const FAQ_INTAKE = {
  headline: 'Questions before you book',
  items: [
    {
      q: 'Does the intake session cost anything?',
      a: 'No. The 30 minutes carries no charge in any form. It exists so we can understand what is going on and tell you whether we can help, before money enters the conversation at all.',
    },
    {
      q: 'Is the intake the same as a therapy session?',
      a: 'No. It is shorter and its job is different. The intake works out what is going on and whether we are the right clinic for it. Therapy itself starts in the regular sessions afterwards, if you decide to continue.',
    },
    {
      q: 'What do sessions cost if I continue?',
      a: `Regular sessions run ${INTAKE.priceRange} each, depending on what the treatment focuses on. You hear the exact figure for your situation during the intake, so nothing lands as a surprise later.`,
    },
    {
      q: 'Can I do the intake online?',
      a: 'Yes. In person at our Dubai Science Park clinic or online, whichever is easier for you. Tell us which you prefer in the form and we work around it.',
    },
    {
      q: 'Who will I be talking to?',
      a: 'A qualified clinical psychologist from our team, for the full 30 minutes. If your situation suits a different specialist here, working that out is part of what the intake is for.',
    },
    {
      q: 'What if I decide not to continue?',
      a: 'Then you do not continue, and you have paid nothing. If somebody outside our clinic would serve you better, you leave knowing that too, and there is no follow-up pressure from us.',
    },
    {
      q: 'Can I claim the sessions on my insurance?',
      a: 'We are pay and claim, not direct billing. You pay at the clinic and we give you a receipt to submit to your insurance provider for reimbursement. Whether it comes back to you depends on your policy.',
    },
    {
      q: 'What if I am in crisis right now?',
      a: 'If you are in immediate crisis or having thoughts of self-harm, please call 999 or the UAE Mental Support Line on 800-HOPE (800-4673). We are not an emergency service. Once you are safe, we are here for ongoing care.',
    },
    {
      q: 'What happens after I submit the form?',
      a: 'Our team reaches out to find a time that works for you, in person or online. No high-pressure calls. You decide if and when to come in.',
    },
  ],
} as const;

export const FINAL_CTA_INTAKE = {
  headline: 'Ready to talk it through?',
  sub: 'Our team reaches out to find a time that suits you, at the clinic or online. The intake costs nothing and commits you to nothing.',
  primary: 'Book my intake session',
} as const;
