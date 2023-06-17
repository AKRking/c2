"use client";

import React, { useState } from "react";

import { getPosts } from "@/hooks/topics";

interface ITopicContext {
  topics: any;
  isLoading: boolean;
  mutate: any;
  activePage: number;
  setActivePage: (e: any) => void;
}

interface Props {
  children?: React.ReactNode;
}

export const TopicContext = React.createContext<ITopicContext>({
  topics: [],
  isLoading: false,
  mutate: () => {},
  activePage: 1,
  setActivePage: (e: any) => {},
});

export const TopicProvider: React.FC<Props> = ({ children }) => {
  const [activePage, setActivePage] = useState(1);
  const { topics, isLoading, mutate } = getPosts(activePage);

  return (
    <TopicContext.Provider
      value={{ topics, isLoading, mutate, activePage, setActivePage }}
    >
      {children}
    </TopicContext.Provider>
  );
};
