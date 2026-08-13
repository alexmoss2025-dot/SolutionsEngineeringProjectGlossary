'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, BookOpen, Building2, Filter, X } from 'lucide-react'
import { glossaryTerms, type GlossaryTerm } from '@/data/glossary'

type Category = 'All' | 'Business Analyst' | 'Company-Specific'

const categories: Category[] = ['All', 'Business Analyst', 'Company-Specific']

const categoryIcons: Record<Category, React.ReactNode> = {
  All: <Filter className="w-4 h-4" />,
  'Business Analyst': <BookOpen className="w-4 h-4" />,
  'Company-Specific': <Building2 className="w-4 h-4" />,
}

function getCategoryCounts(terms: GlossaryTerm[]): Record<Category, number> {
  const ba = (terms ?? []).filter((t: GlossaryTerm) => t?.category === 'Business Analyst')?.length ?? 0
  const cs = (terms ?? []).filter((t: GlossaryTerm) => t?.category === 'Company-Specific')?.length ?? 0
  return { All: terms?.length ?? 0, 'Business Analyst': ba, 'Company-Specific': cs }
}

export default function GlossaryClient() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const allCounts = useMemo(() => getCategoryCounts(glossaryTerms), [])

  const filtered = useMemo(() => {
    const q = search?.toLowerCase?.() ?? ''
    return (glossaryTerms ?? []).filter((t: GlossaryTerm) => {
      const matchCategory = activeCategory === 'All' || t?.category === activeCategory
      const matchSearch =
        !q ||
        (t?.term?.toLowerCase?.() ?? '').includes(q) ||
        (t?.definition?.toLowerCase?.() ?? '').includes(q)
      return matchCategory && matchSearch
    })
  }, [search, activeCategory])

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F8FAF9' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ background: 'rgba(45, 106, 79, 0.97)', borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-display font-bold text-lg" style={{ background: '#52B788', color: '#fff' }}>
              M
            </div>
            <div>
              <h1 className="font-display font-bold text-white text-lg leading-tight tracking-tight">Moss</h1>
              <p className="text-xs leading-tight" style={{ color: 'rgba(216, 243, 220, 0.8)' }}>Empower to create the exceptional</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" style={{ color: '#D8F3DC' }} />
            <span className="font-display font-semibold text-white text-sm sm:text-base">Project Glossary</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 sm:py-16 text-center" style={{ background: 'linear-gradient(180deg, #D8F3DC 0%, #F8FAF9 100%)' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4" style={{ background: 'rgba(45, 106, 79, 0.1)', color: '#2D6A4F' }}>
              <BookOpen className="w-4 h-4" />
              {allCounts.All} Terms
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3" style={{ color: '#1B2D2A' }}>
              Project Glossary
            </h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: '#2D6A4F' }}>
              A quick-reference guide to key project terms and definitions used across Moss teams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search + Filters */}
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 -mt-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-white rounded-xl p-4 sm:p-5" style={{ boxShadow: 'var(--shadow-md)' }}
        >
          {/* Search bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#52B788' }} />
            <input
              type="text"
              placeholder="Search terms or definitions…"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e?.target?.value ?? '')}
              className="w-full pl-11 pr-10 py-3 rounded-lg text-sm border transition-all focus:outline-none focus:ring-2"
              style={{ borderColor: '#D8F3DC', background: '#F8FAF9', color: '#1B2D2A' }}
              onFocus={(e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = '#52B788'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(82, 183, 136, 0.15)' }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = '#D8F3DC'; e.currentTarget.style.boxShadow = 'none' }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" style={{ color: '#6b7280' }} />
              </button>
            )}
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat: Category) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: activeCategory === cat ? '#2D6A4F' : 'transparent',
                  color: activeCategory === cat ? '#fff' : '#2D6A4F',
                  border: activeCategory === cat ? '1px solid #2D6A4F' : '1px solid #D8F3DC',
                }}
              >
                {categoryIcons[cat]}
                {cat}
                <span
                  className="ml-1 px-1.5 py-0.5 rounded-full text-xs font-semibold"
                  style={{
                    background: activeCategory === cat ? 'rgba(255,255,255,0.2)' : 'rgba(45, 106, 79, 0.08)',
                    color: activeCategory === cat ? '#fff' : '#2D6A4F',
                  }}
                >
                  {allCounts[cat]}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Results count */}
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 mt-6 mb-4">
        <p className="text-sm font-medium" style={{ color: '#52B788' }}>
          Showing {filtered?.length ?? 0} of {allCounts.All} terms
        </p>
      </div>

      {/* Table */}
      <main className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 pb-16 flex-1">
        <AnimatePresence mode="popLayout">
          {(filtered?.length ?? 0) > 0 ? (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl overflow-hidden"
              style={{ boxShadow: 'var(--shadow-md)', border: '1px solid #e8f0ec' }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: '#2D6A4F' }}>
                      <th className="text-left px-5 py-3.5 font-display font-semibold text-white whitespace-nowrap w-[200px] min-w-[160px]">Term</th>
                      <th className="text-left px-5 py-3.5 font-display font-semibold text-white">Definition</th>
                      <th className="text-left px-5 py-3.5 font-display font-semibold text-white whitespace-nowrap w-[160px] min-w-[140px]">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(filtered ?? []).map((term: GlossaryTerm, idx: number) => (
                      <motion.tr
                        key={term?.term ?? idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, delay: Math.min(idx * 0.02, 0.3) }}
                        className="transition-colors hover:bg-[#f0f7f2] group"
                        style={{ borderBottom: '1px solid #e8f0ec' }}
                      >
                        <td className="px-5 py-4 align-top">
                          <span className="font-display font-bold text-sm" style={{ color: '#2D6A4F' }}>
                            {term?.term ?? 'Unknown'}
                          </span>
                        </td>
                        <td className="px-5 py-4 align-top leading-relaxed" style={{ color: '#3d5a4c' }}>
                          {term?.definition ?? ''}
                        </td>
                        <td className="px-5 py-4 align-top">
                          <span
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap"
                            style={{
                              background: term?.category === 'Company-Specific' ? 'rgba(233, 196, 106, 0.2)' : 'rgba(45, 106, 79, 0.1)',
                              color: term?.category === 'Company-Specific' ? '#b8860b' : '#2D6A4F',
                            }}
                          >
                            {term?.category === 'Company-Specific' ? (
                              <Building2 className="w-3 h-3 mr-1" />
                            ) : (
                              <BookOpen className="w-3 h-3 mr-1" />
                            )}
                            {term?.category ?? 'General'}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: '#D8F3DC' }}>
                <Search className="w-7 h-7" style={{ color: '#2D6A4F' }} />
              </div>
              <h3 className="font-display font-semibold text-lg mb-1" style={{ color: '#1B2D2A' }}>No matching terms</h3>
              <p className="text-sm" style={{ color: '#6b7280' }}>Try adjusting your search or changing the filter.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t py-6" style={{ borderColor: '#e8f0ec', background: '#fff' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center font-display font-bold text-xs" style={{ background: '#2D6A4F', color: '#fff' }}>
              M
            </div>
            <span className="text-sm font-medium" style={{ color: '#1B2D2A' }}>Moss Construction</span>
          </div>
          <p className="text-xs" style={{ color: '#6b7280' }}>© 2025 Moss Construction. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
