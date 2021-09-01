import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
import { Flex, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react'
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface UpdootSectionProps {
    post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({post}) => {
    const [loadingState, setLoadingState] = useState<'updoot-loading' | 'downdoot-loading' | 'not-loading'>('not-loading');
    const [, vote] = useVoteMutation();
        return (
            <Flex 
                direction="column" 
                justifyContent="center"
                alignItems="center"
                mr={4}
            >
                {/* Updoot */}
               
              <IconButton borderRadius="lg"
               onClick={async () => {
                if (post.voteStatus === 1) {
                    return ;
                }
                setLoadingState('updoot-loading')
                await vote({
                    postId: post.id,
                    value: 1
                });
                setLoadingState('not-loading')
            }}
                isLoading={loadingState === 'updoot-loading'}
                colorScheme={post.voteStatus === 1 ? "green" : undefined}
                aria-label="updoot-post"
                size="md"
                icon={<ArrowUpIcon />}
              />
            
            {post.points}
            
            {/* Downdoot */}
            <IconButton borderRadius="lg"
              onClick={async () => {
                  if (post.voteStatus === -1) {
                      return ;
                  }
                setLoadingState('downdoot-loading')
                await vote({
                    postId: post.id,
                    value: -1
                });
                setLoadingState('not-loading')
            }}
            isLoading={loadingState === 'downdoot-loading'}

                colorScheme={post.voteStatus === -1 ? "red" : undefined}
                aria-label="downdoot-post"
                size="md"
                icon={ <ArrowDownIcon/>}
              />
          
          </Flex>
        );
}

function cn(arg0: string, arg1: { 'text-red-500 bg-gray-300': boolean; }): string | undefined {
    throw new Error('Function not implemented.');
}
