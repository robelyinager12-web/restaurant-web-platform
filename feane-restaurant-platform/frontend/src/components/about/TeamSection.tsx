// File: frontend/src/components/about/TeamSection.tsx
import Image from 'next/image';

// Populate frontend/public/images/team/ with real staff photos and update
// names/roles/bios below.
const TEAM = [
  {
    name: 'Head Chef',
    role: 'Executive Chef',
    bio: 'Leads the kitchen with a decade of experience turning simple ingredients into standout dishes.',
    photo: '/images/team/chef.jpg',
  },
  {
    name: 'Restaurant Manager',
    role: 'General Manager',
    bio: 'Oversees daily operations and makes sure every guest leaves happier than they arrived.',
    photo: '/images/team/manager.jpg',
  },
  {
    name: 'Sous Chef',
    role: 'Sous Chef',
    bio: 'Keeps the kitchen running smoothly during the rush, with an eye for consistency on every plate.',
    photo: '/images/team/sous-chef.jpg',
  },
];

export function TeamSection() {
  return (
    <section className="bg-black/20 py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            The People Behind It
          </p>
          <h2 className="mt-3 font-display text-4xl italic text-white md:text-5xl">
            Meet Our Team
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-full bg-white/5">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="224px"
                />
              </div>
              <h3 className="mt-5 font-display text-xl text-white">{member.name}</h3>
              <p className="text-sm text-brand-gold">{member.role}</p>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-white/60">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}