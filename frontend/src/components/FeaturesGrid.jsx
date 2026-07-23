import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Shield, Zap, MessageCircle, Building2, Search } from 'lucide-react';
import SectionHeading from './SectionHeading';

const FEATURES = [
  { icon: Search, title: 'Smart Search', desc: 'Filter by area, type, budget & amenities across Jaipur localities.', to: '/rooms', color: 'from-emerald-500 to-teal-600' },
  { icon: MessageCircle, title: 'Owner Chat', desc: 'Message property owners before visiting. All conversations saved in your inbox.', to: '/rooms', color: 'from-cyan-500 to-blue-600' },
  { icon: Users, title: 'Room Partner', desc: 'Find verified roommates near your Jaipur college and split rent fairly.', to: '/dashboard/tenant/room-partner', color: 'from-brand-500 to-indigo-600' },
  { icon: Shield, title: 'Verified Listings', desc: 'Real owner photos, honest descriptions & admin-backed complaint support.', to: '/rooms?verified=true', color: 'from-violet-500 to-purple-600' },
  { icon: Building2, title: 'Free Owner Post', desc: 'Landlords list PGs & flats at zero cost — reach thousands of Jaipur tenants.', to: '/post', color: 'from-teal-500 to-emerald-600' },
  { icon: Zap, title: 'Contact Helpline', desc: 'SmartRoooms connects you with owners when you need extra help.', to: '/contact', color: 'from-orange-500 to-red-500' },
];

export default function FeaturesGrid() {
  return (
    <section className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          badge="Why SmartRoooms"
          title="Everything you need to"
          highlight="rent smarter in Jaipur"
          subtitle="Built for students, working professionals & PG owners — one platform for search, chat & trust."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -8 }}
            >
              <Link
                to={f.to}
                className="group relative block h-full overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-200/50 transition hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-500/10"
              >
                <div className={`mb-4 inline-flex rounded-2xl bg-gradient-to-br ${f.color} p-3.5 text-white shadow-lg transition group-hover:scale-110`}>
                  <f.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{f.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
