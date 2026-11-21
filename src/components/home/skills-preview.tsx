import { Container } from "@/components/layout/container";
import { SkillsSection } from "@/components/skills/skills-section";

export function SkillsPreview() {
  return (
    <div className="border-border py-section border-t">
      <Container>
        <SkillsSection />
      </Container>
    </div>
  );
}
