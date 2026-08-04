/**
 * Single source of truth for all copy and content used in the static fallback build.
 * In Storyblok mode the page document overrides everything here.
 *
 * Copy sourced from potentiaclinics.com (live converting site) where one exists; otherwise
 * written from the brief: premium mental-health clinic in Dubai, in-person,
 * highly-skilled DHA-licensed clinical psychologists, located in Dubai Science Park.
 */

export const SITE = {
  name: 'Potentia Clinics',
  legalName: 'Potentia Clinics',
  domain: 'potentiaclinics.com',
  url: 'https://potentiaclinics.com',
  email: 'welcome@potentiaclinics.com',
  address: 'Dubai Science Park, DSP HQ South Tower, 2nd Floor, 201',
  phone: '+971 4 582 6999',
  whatsapp: '971527173080',
  googleRating: 4.9,
  googleReviewsCount: 0,
  social: {
    instagram: 'https://instagram.com/potentiaclinics',
  },
} as const;

export const HERO = {
  h1: 'Start feeling like yourself again and be happy.',
  // §50 Schwartz identification + mechanism + reason-why + outcome. §46 scan-path bolding.
  sub: '<strong class="font-semibold text-navy">The same psychologist every session.</strong> Unhurried, focused time, in person, built around what you\'re actually dealing with.',
  trustBullets: [
    'Matched-method therapy',
    'Dubai Science Park',
    'Same clinician throughout',
    '50-minute private sessions',
  ],
  microproof: 'Psychology, psychiatry, and clinical nutrition under one roof.',
  formHeadline: 'Request a first consultation',
  formSub: 'Confidential. Reply within 24 hours.',
  ctaPrimary: 'Request a first consultation',
} as const;

export const TOP_BAR = {
  trustLine: 'Highly skilled clinicians. Dubai Science Park.',
  ctaLabel: 'Request Consultation',
} as const;

export const TRUST_STRIP = {
  badges: [
    { label: 'Highly skilled clinicians', icon: 'shield' },
    { label: 'Dubai Science Park', icon: 'pin' },
    { label: 'Psychology + Psychiatry', icon: 'mind' },
    { label: 'Same clinician throughout', icon: 'video' },
  ],
  counters: [
    { value: '8', label: 'specialists' },
    { value: '50', label: 'minute sessions' },
    { value: '1:1', label: 'same clinician' },
  ],
} as const;

// Section 3 — pain agitation. Bodies use HTML strings with <strong> scan-path bolding (§46).
export const FOUR_SITUATIONS = {
  headline: 'Does any of this sound familiar?',
  items: [
    {
      title: 'Successful, but empty inside.',
      body: 'The promotions, the address, the network all work. The mornings don\'t, <strong class="font-semibold text-navy">no matter how busy you stay</strong>.',
      icon: 'empty',
    },
    {
      title: 'Strong for everyone, unseen.',
      body: 'The school runs, the broken sleep, the emotional labour nobody notices. People call you amazing; <strong class="font-semibold text-navy">nobody asks what it costs</strong>.',
      icon: 'unseen',
    },
    {
      title: 'Surrounded, and still lonely.',
      body: 'Friends rotate out, the apps blur, dating fatigue sets in. <strong class="font-semibold text-navy">In a city this social, loneliness lands harder</strong>.',
      icon: 'lonely',
    },
    {
      title: 'You want real privacy.',
      body: 'Mental health is private, and you want a clinic that respects it. <strong class="font-semibold text-navy">Modern, discreet, DHA-licensed</strong>, same clinician every session.',
      icon: 'privacy',
    },
  ],
  ctaLabel: 'See if Potentia fits',
} as const;

// Section 4 — outcome-driven, matches the "what changes" headline
export const BENEFITS = {
  headline: 'What changes when you come to Potentia',
  subline: 'Three differences our patients report by the third session.',
  items: [
    {
      title: 'You start sleeping properly again, and reacting like yourself.',
      body: 'Real progress in mental health rarely feels dramatic at the start. It shows up as <strong class="font-semibold text-navy">deeper sleep</strong>, <strong class="font-semibold text-navy">slower reactions to old triggers</strong>, and decisions that come more naturally as the weeks go on. Sessions <strong class="font-semibold text-navy">push you forward</strong> instead of looping you around the same problem.',
      change: {
        before: 'Hours staring at the ceiling, anxious mornings',
        after: 'Steady sleep, clearer mornings, calmer days',
      },
      image: '/images/generated/benefit-sleep.webp',
      imageAlt: 'A young woman in modest cream loungewear sitting up in bed at dawn in a luxury Dubai bedroom, calm and refreshed, soft morning light through linen curtains, sage olive plant on the bedside table.',
    },
    {
      title: 'You stop second-guessing your therapist.',
      body: 'Your psychologist is <strong class="font-semibold text-navy">DHA-licensed</strong> and trained in <strong class="font-semibold text-navy">evidence-based methods like CBT, ACT, EMDR</strong>, and Schema Therapy. The match is clinical, not random. You finally feel in <strong class="font-semibold text-navy">the right hands</strong>.',
      change: {
        before: 'A new stranger to retell your story to',
        after: 'Same DHA-licensed clinician throughout your care',
      },
      image: '/images/generated/benefit-trust.webp',
      imageAlt: 'A young female client in modest cream loungewear in calm conversation with her senior female clinical psychologist in a sage-walled Dubai consultation room, large arched window with palm trees behind them, comfortable trusting body language.',
    },
    {
      title: 'Your plan adapts when life does.',
      body: 'Life shifts. Your plan shifts with it, guided by the <strong class="font-semibold text-navy">same clinician who already knows your story</strong>. No starting over, no re-explaining where you left off. Care that <strong class="font-semibold text-navy">fits your life</strong> instead of fighting it.',
      change: {
        before: 'Starting over every time life changes',
        after: 'One clinician who adapts with you',
      },
      image: '/images/generated/benefit-flexible.webp',
      imageAlt: 'Editorial illustration: a client in a calm in-person session with the same clinician at the Dubai Science Park clinic, warm sage and cream tones.',
    },
  ],
  ctaLabel: 'See what changes for me',
} as const;

// Section 4.5 — emotional before/after, regenerated for clearer "after" mood
export const FILTER_PROOF = {
  eyebrow: 'What change actually feels like',
  headline: 'A few weeks in, things start to shift.',
  body: 'Real progress in mental health is rarely dramatic. It is <strong class="font-semibold text-white">small, steady changes</strong>. Sleeping deeper. Reacting less. Saying yes to the right things. Saying no to the wrong ones. With the right psychologist, <strong class="font-semibold text-white">that shift is closer than you think</strong>.',
  image: '/images/generated/before-after.webp',
  imageAlt: 'Editorial split-scene illustration in warm sage and cream tones. Left half shows a person on a couch in dim morning light, hand on forehead, posture slumped. Right half shows the same person eight weeks later, sitting comfortably with a soft smile reading a book, sage throw, healthy plant on the sill.',
  badgeClean: { title: 'WEEK 1', sub: 'Tired. Anxious. Stuck.' },
  badgeUsed: { title: 'WEEK 8', sub: 'Sleeping. Steady. In motion.' },
  ctaLabel: 'See where I am today',
} as const;

// Section 5 — three steps to first session
export const PROCESS = {
  headline: 'Three steps to your first session',
  steps: [
    { n: 1, title: 'Tell us what is going on', body: 'Fill the short form. We review your situation and match you to the right psychologist or psychiatrist.', time: '60 seconds' },
    { n: 2, title: 'First session, scheduled fast', body: 'We book your 50-minute consultation, in person at our DSP clinic. Usually within a week.', time: 'within one week' },
    { n: 3, title: 'Move forward, with a plan', body: 'Your clinician gives you a clear path. Continue at your pace, on your terms.', time: 'ongoing care' },
  ],
} as const;

// Section 6
export const COST_COMPARISON = {
  headline: 'Generic therapy app vs. clinical psychology',
  intro: 'Quick chats with a different stranger every week feel useful for a moment. Real change comes from a continuous relationship with a clinically trained psychologist who has a plan for you.',
  left: {
    title: 'Generic therapy app',
    items: [
      'Different therapist each week',
      'Mostly text-based and rushed',
      'No clinical assessment',
      'No medical coordination if needed',
    ],
  },
  right: {
    title: 'Potentia Clinics',
    items: [
      'Same DHA-licensed psychologist',
      '50-minute private sessions',
      'Full clinical assessment',
      'Psychology, psychiatry, nutrition under one roof',
    ],
  },
  ctaLabel: 'Match me with a clinician',
} as const;

// Section 7
export const SOCIAL_PROOF = {
  statHeadline: 'Premium mental-health care, on your terms.',
  statSub: 'Psychology, psychiatry, and clinical nutrition. One private clinic in Dubai Science Park.',
  reviews: [] as Array<{ name: string; emirate: string; quote: string; photo?: string }>,
} as const;

// Section 8 — real team photo + actual clinician names from potentiaclinics.com
export const ABOUT = {
  headline: 'A Dubai clinic where mental healthcare is reimagined.',
  paragraphs: [
    'Potentia Clinics is a <strong class="font-semibold text-navy">multidisciplinary mental-health practice in Dubai Science Park</strong>, with clinical psychology, psychiatry, and nutrition under one roof. Our clinicians are <strong class="font-semibold text-navy">DHA-licensed, trained in evidence-based methods including EMDR</strong>, so you do not have to wonder whether the person sitting across from you knows what they are doing.',
    'You came here because something needs to change. The clinic exists to make that change practical. <strong class="font-semibold text-navy">Private sessions, a clear plan, the right specialist</strong> for what you are actually facing. In person at the clinic in Dubai Science Park.',
  ],
  // Pulled verbatim from potentiaclinics.com — the actual specialist team
  team: [
    { name: 'Alina Vasilache', title: 'Clinical Psychologist' },
    { name: 'Maria Alvarez', title: 'Clinical Psychologist' },
    { name: 'Adhishri Yadav', title: 'Clinical Psychologist' },
    { name: 'Dr. Raquel del Hoyo Mitjans', title: 'Psychiatrist' },
    { name: 'Dr. Samar Habibulla', title: 'Psychiatrist' },
    { name: 'Dr. Mehrdad Ghayemmaghami', title: 'Psychiatrist' },
    { name: 'Yara Abugharbiyeh', title: 'Clinical Dietitian' },
    { name: 'Rama Adnan', title: 'Clinical Dietitian' },
  ],
  credentials: [
    'DHA Licensed (BQRK1MVF-260124)',
    'Clinical psychology and psychiatry',
    'CBT, ACT, EMDR, Schema Therapy',
    'In-person sessions at our DSP clinic',
    'Dubai Science Park, DSP HQ South',
    'Multidisciplinary clinical team',
  ],
  promise: 'Confidential. Premium. Built for change. That is the deal.',
  teamPhoto: '/brand/team-photo.jpg',
} as const;

// Section 9 — FAQ
export const FAQ = {
  headline: 'Common questions before your first session',
  items: [
    {
      q: 'How much does a session cost?',
      a: 'Pricing depends on the clinician, session length, and whether you need psychology, psychiatry, or both. We share transparent pricing with you when we confirm your booking. No surprises.',
    },
    {
      q: 'Are sessions confidential?',
      a: "Yes. Everything you share is protected by clinical confidentiality and UAE data-protection regulations. The only exception is when there is a serious risk to your safety or someone else's, where we may need to coordinate care.",
    },
    {
      q: 'Are your psychologists actually licensed?',
      a: 'Every clinician is DHA-licensed and clinically trained. You can ask about their specific qualifications and approach before booking. We will match you to the right specialist for your situation.',
    },
    {
      q: 'Where is the clinic?',
      a: 'We are in Dubai Science Park, DSP HQ South Tower, 2nd floor. Sessions are in person, with the same clinician each time, in a calm and private setting.',
    },
    {
      q: 'What is the difference between psychology and psychiatry?',
      a: 'Clinical psychologists treat mental-health concerns with evidence-based talk therapies. Psychiatrists are medical doctors who can also assess and prescribe medication. We coordinate both under one roof if you need it.',
    },
    {
      q: 'How long is a session?',
      a: 'Sessions are 50 minutes by default. Initial assessments may run longer. We do not rush appointments to fit a quota.',
    },
    {
      q: 'Do you treat children and teens?',
      a: 'Yes. Several of our clinical psychologists specialise in children and adolescents. Indicate this in the form and we will match you with the right person.',
    },
    {
      q: 'How quickly can I get an appointment?',
      a: 'Usually within a week of submitting the form. If you indicate that the matter is urgent, we prioritise scheduling and reach out the same day.',
    },
    {
      q: 'What if I am in crisis right now?',
      a: 'If you are in immediate crisis or having thoughts of self-harm, please call 999 or the UAE Mental Support Line on 800-HOPE (800-4673). Our clinic is not an emergency service. Once you are safe, we are here for ongoing care.',
    },
    {
      q: 'What happens after I submit the form?',
      a: 'Within 24 hours, our team reaches out to confirm your match, scheduling, and pricing. No high-pressure calls. You decide if and when to book.',
    },
  ],
} as const;

// Section 10
export const FINAL_CTA = {
  headline: 'Ready to talk to the right person?',
  sub: 'Confidential consultation. DHA-licensed clinicians. Reply within 24 hours.',
  primary: 'Book my first session',
  badges: ['Highly skilled clinicians', 'Dubai Science Park', 'Psychology + Psychiatry', 'Same clinician throughout'],
} as const;

export const STICKY_BAR = {
  ctaLabel: 'Request Consultation',
} as const;
