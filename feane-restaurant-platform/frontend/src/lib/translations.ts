// File: frontend/src/lib/translations.ts
// Central translation dictionary. Add new keys here as more of the site
// gets translated — components should never hardcode English strings
// once they're wired to use this.

export const translations = {
  en: {
    nav: {
      home: 'HOME',
      menu: 'MENU',
      about: 'ABOUT',
      bookTable: 'BOOK TABLE',
      contact: 'CONTACT',
      orderOnline: 'Order Online',
      signIn: 'Sign In',
      signOut: 'Sign out',
      search: 'Search',
      cart: 'Cart',
    },
    login: {
      title: 'Sign In',
      email: 'Email',
      password: 'Password',
      submit: 'Sign In',
      submitting: 'Signing in…',
      noAccount: "Don't have an account?",
      register: 'Register',
    },
    register: {
      title: 'Create Account',
      fullName: 'Full name',
      email: 'Email',
      phone: 'Phone (optional)',
      password: 'Password',
      passwordHint: 'At least 8 characters.',
      submit: 'Register',
      submitting: 'Creating account…',
      haveAccount: 'Already have an account?',
      signIn: 'Sign in',
    },
  },
  am: {
    nav: {
      home: 'መነሻ',
      menu: 'ምናሌ',
      about: 'ስለ እኛ',
      bookTable: 'ጠረጴዛ ያስይዙ',
      contact: 'አግኙን',
      orderOnline: 'በመስመር ላይ ይዘዙ',
      signIn: 'ግባ',
      signOut: 'ውጣ',
      search: 'ፈልግ',
      cart: 'ጋሪ',
    },
    login: {
      title: 'ግባ',
      email: 'ኢሜይል',
      password: 'የይለፍ ቃል',
      submit: 'ግባ',
      submitting: 'በመግባት ላይ…',
      noAccount: 'መለያ የለዎትም?',
      register: 'ተመዝገብ',
    },
    register: {
      title: 'መለያ ይፍጠሩ',
      fullName: 'ሙሉ ስም',
      email: 'ኢሜይል',
      phone: 'ስልክ (አማራጭ)',
      password: 'የይለፍ ቃል',
      passwordHint: 'ቢያንስ 8 ቁምፊዎች።',
      submit: 'ተመዝገብ',
      submitting: 'መለያ በመፍጠር ላይ…',
      haveAccount: 'መለያ አለዎት?',
      signIn: 'ግባ',
    },
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = typeof translations.en;