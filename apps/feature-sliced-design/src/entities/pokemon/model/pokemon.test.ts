import { describe, expect, it } from 'vitest'

import { formatPokemonId, getPokemonTypeClasses, parsePokemonId } from './pokemon'

describe('formatPokemonId', () => {
  it('pads single digit with two zeros', () => {
    expect(formatPokemonId(1)).toBe('#001')
  })

  it('pads double digit with one zero', () => {
    expect(formatPokemonId(25)).toBe('#025')
  })

  it('leaves triple digit as-is', () => {
    expect(formatPokemonId(151)).toBe('#151')
  })
})

describe('parsePokemonId', () => {
  it('returns number for valid string id', () => {
    expect(parsePokemonId('25')).toBe(25)
  })

  it('returns 1 for boundary minimum', () => {
    expect(parsePokemonId('1')).toBe(1)
  })

  it('returns 151 for boundary maximum', () => {
    expect(parsePokemonId('151')).toBe(151)
  })

  it('returns null for zero', () => {
    expect(parsePokemonId('0')).toBeNull()
  })

  it('returns null for id above 151', () => {
    expect(parsePokemonId('152')).toBeNull()
  })

  it('returns null for non-numeric string', () => {
    expect(parsePokemonId('abc')).toBeNull()
  })

  it('returns null for undefined', () => {
    expect(parsePokemonId(undefined)).toBeNull()
  })

  it('returns null for float', () => {
    expect(parsePokemonId('1.5')).toBeNull()
  })

  it('returns null for negative number', () => {
    expect(parsePokemonId('-1')).toBeNull()
  })
})

describe('getPokemonTypeClasses', () => {
  it('returns classes for Fire type', () => {
    expect(getPokemonTypeClasses('Fire')).toContain('bg-rose-500/20')
  })

  it('returns classes for Water type', () => {
    expect(getPokemonTypeClasses('Water')).toContain('bg-blue-500/20')
  })

  it('returns classes for Grass type', () => {
    expect(getPokemonTypeClasses('Grass')).toContain('bg-emerald-500/20')
  })
})
