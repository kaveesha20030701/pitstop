// Copyright (c) 2026 WSO2 LLC. (https://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import { useState, useCallback } from "react";
import { useAppDispatch, useAppSelector, RootState } from "@slices/store";
import { fetchMentionSuggestions } from "@slices/pageSlice/page";
import { EmployeeSuggestion, MentionedUser } from "@/types/types";

interface UseMentionsReturn {
  suggestions: EmployeeSuggestion[];
  mentionedUsers: MentionedUser[];
  activeQuery: string;
  handleCommentChange: (text: string) => void;
  selectMention: (user: EmployeeSuggestion, currentText: string, onChange: (text: string) => void) => void;
  setMentionedUsers: (users: MentionedUser[] | ((prev: MentionedUser[]) => MentionedUser[])) => void;
  clearSuggestions: () => void;
}

export const useMentions = (): UseMentionsReturn => {
  const dispatch = useAppDispatch();
  const [suggestions, setSuggestions] = useState<EmployeeSuggestion[]>([]);
  const [mentionedUsers, setMentionedUsers] = useState<MentionedUser[]>([]);
  const [activeQuery, setActiveQuery] = useState<string>("");
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const currentUserEmail = useAppSelector(
    (state: RootState) => state.auth.userInfo?.email ?? ""
  );

  const handleCommentChange = useCallback(
    (text: string) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      const mentionMatch = text.match(/@([\w]*)$/);

      if (mentionMatch) {
        const query = mentionMatch[1];
        setActiveQuery(query);

        const timer = setTimeout(() => {
          if (query.length >= 2) {
            dispatch(fetchMentionSuggestions({ query }))
              .then((result) => {
                const payload = result.payload as EmployeeSuggestion[] | undefined;
                if (payload) {
                  const filteredSuggestions = payload.filter(
                    (suggestion) => suggestion.workEmail !== currentUserEmail
                  );
                  setSuggestions(filteredSuggestions);
                }
              })
              .catch(() => {
                setSuggestions([]);
              });
          } else if (query.length === 0) {
            setSuggestions([]);
            setActiveQuery("");
          }
        }, 300);

        setDebounceTimer(timer);
      } else {
        setSuggestions([]);
        setActiveQuery("");
      }
    },
    [dispatch, debounceTimer, currentUserEmail]
  );

  const selectMention = useCallback(
    (user: EmployeeSuggestion, currentText: string, onChange: (text: string) => void) => {
      const textWithoutQuery = currentText.replace(/@[\w]*$/, "");
      const displayName = `${user.firstName} ${user.lastName} `;
      const newText = textWithoutQuery + displayName;

      const mentionedUser: MentionedUser = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.workEmail,
        thumbnail: user.employeeThumbnail,
      };

      setMentionedUsers((prev) => {
        if (!prev.some((u) => u.email === mentionedUser.email)) {
          return [...prev, mentionedUser];
        }
        return prev;
      });

      onChange(newText);
      setSuggestions([]);
      setActiveQuery("");
    },
    []
  );

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setActiveQuery("");
  }, []);

  return {
    suggestions,
    mentionedUsers,
    activeQuery,
    handleCommentChange,
    selectMention,
    setMentionedUsers,
    clearSuggestions,
  };
};
