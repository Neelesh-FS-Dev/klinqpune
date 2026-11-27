import { useState } from 'react'
import { FOOD, DRINKS, MOCKTAILS_NOTE } from '../data/menu'
import type { MenuItem } from '../types'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { BUSINESS } from '../data/business'

type Tab = 'food' | 'drinks'
type DrinkFilter = 'all' | 'alcoholic' | 'mocktails'

function groupBy(items: MenuItem[]) {
  const map = new Map<string, MenuItem[]>()
  for (const item of items) map.set(item.group, [...(map.get(item.group) ?? []), item])
  return [...map.entries()]
}

function MenuList({ items }: { items: MenuItem[] }) {
  return (
    <div className="menu-groups">
      {groupBy(items).map(([group, list]) => (
        <section key={group} className="menu-group" aria-labelledby={`g-${group.replace(/\W+/g, '-')}`}>
          <h2 id={`g-${group.replace(/\W+/g, '-')}`}>{group}</h2>
          <ul>
            {list.map((item) => (
              <li key={item.name}>
                <div>
                  <span>{item.name}</span>
                  {item.note && <span className="note">{item.note}</span>}
                </div>
                <a href={item.source.url} target="_blank" rel="noopener noreferrer" className="chapter-num" style={{ whiteSpace: 'nowrap' }}>
                  Source<span className="sr-only"> for {item.name} (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

export function Menu() {
  useDocumentMeta('Food & Drinks · KLINQ, Viman Nagar', 'Dishes and drinks named in KLINQ\'s published sources, with links to each source. Confirm the full menu before ordering.')
  const [tab, setTab] = useState<Tab>('food')
  const [filter, setFilter] = useState<DrinkFilter>('all')
  const tabs: Tab[] = ['food', 'drinks']
  const onKey = (e: React.KeyboardEvent) => {
    const i = tabs.indexOf(tab)
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length]
      setTab(next)
      document.getElementById(`menu-tab-${next}`)?.focus()
    }
  }
  const drinks = filter === 'mocktails' ? [] : DRINKS.filter((d) => filter === 'all' || d.alcoholic)

  return (
    <>
      <header className="page-hero container">
        <p className="chapter-num">Food &amp; Drinks</p>
        <h1>Creative cuisine, <em>signature cocktails.</em></h1>
        <p>Every dish and drink here is named in a KLINQ Instagram post or a listing we checked on 27 November 2026. Prices are not shown because none are published in our sources.</p>
      </header>

      <section className="section" aria-label="Menu">
        <div className="container">
          <div className="tabs" role="tablist" aria-label="Menu type" onKeyDown={onKey}>
            <button id="menu-tab-food" role="tab" type="button" className="tab" aria-selected={tab === 'food'} aria-controls="menu-panel" tabIndex={tab === 'food' ? 0 : -1} onClick={() => setTab('food')}>Food</button>
            <button id="menu-tab-drinks" role="tab" type="button" className="tab" aria-selected={tab === 'drinks'} aria-controls="menu-panel" tabIndex={tab === 'drinks' ? 0 : -1} onClick={() => setTab('drinks')}>Drinks</button>
          </div>

          <div id="menu-panel" role="tabpanel" aria-labelledby={`menu-tab-${tab}`}>
            {tab === 'food' && <MenuList items={FOOD} />}
            {tab === 'drinks' && (
              <>
                <div className="chips" role="group" aria-label="Filter drinks">
                  {([['all', 'All'], ['alcoholic', 'Alcoholic'], ['mocktails', 'Mocktails']] as const).map(([value, label]) => (
                    <button key={value} type="button" className="chip" aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</button>
                  ))}
                </div>
                {filter === 'mocktails' && <p className="note-box">{MOCKTAILS_NOTE}</p>}
                {drinks.length > 0 && <MenuList items={drinks} />}
              </>
            )}
          </div>

          <p className="note-box" style={{ marginTop: 48 }}>
            Menus change. Check the current menu on{' '}
            <a href={BUSINESS.reservations[0].url} target="_blank" rel="noopener noreferrer">District</a>,{' '}
            <a href="https://www.zomato.com/pune/klinq-cocktails-cuisine-viman-nagar" target="_blank" rel="noopener noreferrer">Zomato</a> or{' '}
            <a href={BUSINESS.reservations[2].url} target="_blank" rel="noopener noreferrer">Swiggy Dineout</a> (all open in a new tab), or ask at {BUSINESS.phones[0].display}.
            Jain and vegan options are listed on Swiggy; confirm with the restaurant.
          </p>
        </div>
      </section>
    </>
  )
}
