import React from "react";

export const TextIcon = ({
  color,
  BGColor,
  size,
}: {
  color: string;
  BGColor: string;
  size: number;
}) => {
  //default data
  let iconColor = "white";
  let iconBGColor = "black";
  let iconSize = 24;

  if (color) {
    iconColor = color;
  }

  if (BGColor) {
    iconBGColor = BGColor;
  }

  if (size) {
    iconSize = size;
  }

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0325 3.58072H13.9035V5.51636H16.4843V2.29049C16.4843 1.94824 16.3483 1.61991 16.1065 1.37803C15.8643 1.13591 15.5363 1 15.194 1H2.29049C1.94824 1 1.61992 1.13591 1.37803 1.37803C1.13614 1.61992 1 1.94823 1 2.29049V5.51636H3.58076V3.58072H7.45175V16.4842H4.87122V19.0649H12.6133V16.4842H10.0326L10.0325 3.58072Z"
        fill={iconBGColor}
        stroke={iconColor}
      />
      <path
        d="M18.7417 16.4841C18.3855 16.4841 18.0966 16.1952 18.0966 15.839V12.9356H20.6773V10.3551H18.0966V7.77437H15.5158V10.3551H12.9353V12.9359H15.5161V15.839H15.5158C15.5158 16.6946 15.8558 17.515 16.4607 18.12C17.0658 18.7249 17.8862 19.0649 18.7417 19.0649H20.9998L21 16.4841H18.7417Z"
        fill={iconBGColor}
        stroke={iconColor}
      />
    </svg>
  );
};
