// File: frontend/src/lib/translations.ts
export const translations = {
  en: {
    nav: {
      home: 'HOME', menu: 'MENU', about: 'ABOUT', bookTable: 'BOOK TABLE', contact: 'CONTACT',
      orderOnline: 'Order Online', signIn: 'Sign In', signOut: 'Sign out', search: 'Search', cart: 'Cart',
    },
    login: {
      title: 'Sign In', email: 'Email', password: 'Password', submit: 'Sign In',
      submitting: 'Signing in…', noAccount: "Don't have an account?", register: 'Register',
    },
    register: {
      title: 'Create Account', fullName: 'Full name', email: 'Email', phone: 'Phone (optional)',
      password: 'Password', passwordHint: 'At least 8 characters.', submit: 'Register',
      submitting: 'Creating account…', haveAccount: 'Already have an account?', signIn: 'Sign in',
    },
    footer: {
      tagline: 'Fresh, hand-pressed fast food made to order — every single time.',
      quickLinks: 'Quick Links', account: 'Account', contactHeading: 'Contact',
      home: 'Home', menu: 'Menu', about: 'About', bookTable: 'Book Table',
      signIn: 'Sign In', register: 'Register', cart: 'Cart',
      rightsReserved: 'All rights reserved.',
    },
    cart: {
      title: 'Your Cart', empty: 'Your cart is empty.', browseMenu: 'Browse the menu',
      total: 'Total', checkout: 'Proceed to Checkout',
    },
    checkout: {
      title: 'Checkout', orderSummary: 'Order Summary', deliveryOrPickup: 'Delivery or Pickup',
      pickup: 'Pickup', delivery: 'Delivery', deliveryAddress: 'Delivery address',
      contactPhone: 'Contact phone', notes: 'Notes (optional)', placeOrder: 'Place Order',
      placing: 'Placing order…', signedInAs: 'Signed in as',
    },
    booking: {
      title: 'Book a Table', subtitle: "Reserve your spot — no account needed, just a few details.",
      fullName: 'Full name', email: 'Email', phone: 'Phone', partySize: 'Party size',
      date: 'Date', time: 'Time', notes: 'Notes (optional)', submit: 'Book Table', submitting: 'Booking…',
    },
    dashboard: {
      overview: 'Overview', menu: 'Menu', orders: 'Orders', bookings: 'Bookings',
      pendingOrders: 'Pending orders', bookingsToday: 'Bookings today', revenueToday: 'Revenue today',
      signOut: 'Sign out',
    },
    errors: {
      validationFailed: 'Please check the highlighted fields and try again.',
      invalidCredentials: 'Invalid email or password',
      emailInUse: 'An account with this email already exists',
      unauthorized: 'Please sign in to continue',
      forbidden: 'You do not have permission to perform this action',
      notFound: 'The requested item could not be found',
      genericError: 'Something went wrong — please try again',
      requiredField: 'This field is required',
    },
  },
  am: {
    nav: {
      home: 'መነሻ', menu: 'ምናሌ', about: 'ስለ እኛ', bookTable: 'ጠረጴዛ ያስይዙ', contact: 'አግኙን',
      orderOnline: 'በመስመር ላይ ይዘዙ', signIn: 'ግባ', signOut: 'ውጣ', search: 'ፈልግ', cart: 'ጋሪ',
    },
    login: {
      title: 'ግባ', email: 'ኢሜይል', password: 'የይለፍ ቃል', submit: 'ግባ',
      submitting: 'በመግባት ላይ…', noAccount: 'መለያ የለዎትም?', register: 'ተመዝገብ',
    },
    register: {
      title: 'መለያ ይፍጠሩ', fullName: 'ሙሉ ስም', email: 'ኢሜይል', phone: 'ስልክ (አማራጭ)',
      password: 'የይለፍ ቃል', passwordHint: 'ቢያንስ 8 ቁምፊዎች።', submit: 'ተመዝገብ',
      submitting: 'መለያ በመፍጠር ላይ…', haveAccount: 'መለያ አለዎት?', signIn: 'ግባ',
    },
    footer: {
      tagline: 'ትኩስ፣ በእጅ የተጫኑ ፈጣን ምግቦች በትእዛዝ የተዘጋጁ — በየጊዜው።',
      quickLinks: 'ፈጣን ማገናኛዎች', account: 'መለያ', contactHeading: 'አግኙን',
      home: 'መነሻ', menu: 'ምናሌ', about: 'ስለ እኛ', bookTable: 'ጠረጴዛ ያስይዙ',
      signIn: 'ግባ', register: 'ተመዝገብ', cart: 'ጋሪ',
      rightsReserved: 'መብቱ በህግ የተጠበቀ ነው።',
    },
    cart: {
      title: 'ጋሪዎ', empty: 'ጋሪዎ ባዶ ነው።', browseMenu: 'ምናሌውን ይመልከቱ',
      total: 'ጠቅላላ', checkout: 'ወደ ክፍያ ይቀጥሉ',
    },
    checkout: {
      title: 'ክፍያ', orderSummary: 'የትዕዛዝ ማጠቃለያ', deliveryOrPickup: 'ማድረሻ ወይም መውሰጃ',
      pickup: 'መውሰጃ', delivery: 'ማድረሻ', deliveryAddress: 'የማድረሻ አድራሻ',
      contactPhone: 'ስልክ ቁጥር', notes: 'ማስታወሻ (አማራጭ)', placeOrder: 'ትዕዛዝ ያስገቡ',
      placing: 'ትዕዛዝ በማስገባት ላይ…', signedInAs: 'የገቡት እንደ',
    },
    booking: {
      title: 'ጠረጴዛ ያስይዙ', subtitle: 'ቦታዎን ያስይዙ — መለያ አያስፈልግም፣ ጥቂት ዝርዝሮች ብቻ።',
      fullName: 'ሙሉ ስም', email: 'ኢሜይል', phone: 'ስልክ', partySize: 'የሰዎች ብዛት',
      date: 'ቀን', time: 'ሰዓት', notes: 'ማስታወሻ (አማራጭ)', submit: 'ጠረጴዛ ያስይዙ', submitting: 'በማስያዝ ላይ…',
    },
    dashboard: {
      overview: 'አጠቃላይ እይታ', menu: 'ምናሌ', orders: 'ትዕዛዞች', bookings: 'ማስያዣዎች',
      pendingOrders: 'በመጠባበቅ ላይ ያሉ ትዕዛዞች', bookingsToday: 'የዛሬ ማስያዣዎች', revenueToday: 'የዛሬ ገቢ',
      signOut: 'ውጣ',
    },
    errors: {
      validationFailed: 'እባክዎ የተጠቆሙትን መስኮች ያረጋግጡ እና እንደገና ይሞክሩ።',
      invalidCredentials: 'ልክ ያልሆነ ኢሜይል ወይም የይለፍ ቃል',
      emailInUse: 'በዚህ ኢሜይል የተመዘገበ መለያ አስቀድሞ አለ',
      unauthorized: 'እባክዎ ለመቀጠል ይግቡ',
      forbidden: 'ይህን ተግባር የማከናወን ፍቃድ የለዎትም',
      notFound: 'የተጠየቀው ንጥል አልተገኘም',
      genericError: 'የሆነ ችግር ተፈጥሯል — እባክዎ እንደገና ይሞክሩ',
      requiredField: 'ይህ መስክ ያስፈልጋል',
    },
  },
} as const;

export type Language = keyof typeof translations;