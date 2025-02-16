// prompt-generator.ts
export const generateLyricsPrompt = (params: {
  partnerName: string;
  memories: string;
  feeling: string;
}) => {
  return `Create a heartfelt 30 sec love song for my partner, ${params.partnerName}, to celebrate Valentine's Day. The song should capture our special moments and emotions. Our cherished memories include ${params.memories}, and my deepest feelings for them are ${params.feeling}. The lyrics should be romantic, poetic, and touching, with a melody that feels warm and sentimental. Make sure the song flows smoothly, has a gentle rhythm, and conveys deep affection. It should only contain letters and must include the partner's name at the start of the chorus and should have at least 500 characters.`;
};
