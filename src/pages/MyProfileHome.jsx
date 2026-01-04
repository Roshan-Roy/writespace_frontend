import MyStoryCard from "@/components/mycomponents/storyCards/MyStoryCard"
import StoryCard from "@/components/mycomponents/storyCards/StoryCard"

const MyProfileHome = () => {
  return (
    <div className="pb-30">
      <StoryCard />
      <StoryCard />
      <MyStoryCard />
      <MyStoryCard />
    </div>
  )
}

export default MyProfileHome