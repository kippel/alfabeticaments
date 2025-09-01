import ProviderCourses from "@/components/ProviderCourses";

type Props = {
  children: React.ReactNode;
};

const LessonLayout = ({ children }: Props) => {
    return (
      <ProviderCourses>{ children}</ProviderCourses>
        
    )
}

export default LessonLayout;