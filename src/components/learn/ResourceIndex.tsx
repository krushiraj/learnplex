import SectionItems from './SectionItems'
import React from 'react'

import { Section } from '../../graphql/types'

export default function ViewResourceIndex({
  baseSectionId,
  sectionsMap,
}: {
  baseSectionId: string
  sectionsMap: Map<string, Section>
}) {
  const baseSection = sectionsMap.get(baseSectionId)!
  return (
    <SectionItems
      sections={baseSection.sections}
      sectionsMap={sectionsMap}
      topLevel={true}
    />
  )
}
