import { Box, Link, Flex, Button, Heading } from '@chakra-ui/react';
import React from 'react'
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utlis/isServer';
import {useRouter} from 'next/router'

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const router = useRouter();
    const [{fetching: logoutFetching}, logout] = useLogoutMutation();
    const [{data, fetching}] = useMeQuery({
        pause: isServer(),
    });
    let body = null;
  
    // data is loading

    if (fetching ) {

        // user not logged in
    } else if (!data?.me) {
        body = (
            <>
            <NextLink href="/login">
                <Link  mr={2}>login</Link>
            </NextLink>
            <NextLink href="/register">
                <Link >register</Link>
            </NextLink>
        </>
        );
        // user is logeed in
    } else {
        body = (
            <Flex align="center">
                <NextLink href='/create-post'>
                    <Button as={Link} mr={4}>create post</Button>
                </NextLink>
                <Box mr={2 }>{data.me.username}</Box>
                <Button onClick={async () => {
                    await logout();
                    router.reload();
                }}
                isLoading={logoutFetching}
                variant="link"> logout</Button>
            </Flex>
        )
    }

        return (
            <Flex zIndex={1} position="sticky" top={0}  boxShadow="base" borderBottomWidth={1} borderBottomColor="#e8e8e8" bg="rgb(253, 253, 251)" p={4} align="center">
                <Flex flex={1} m="auto" align="center" maxW={800} >
                <NextLink href="/">
                    <Link>
                    <Heading color=" #0033ad">LiReddit</Heading>
                    </Link>
                </NextLink>
                <Box  ml={'auto'}>
                   {body}
                </Box>
                </Flex>
            </Flex>

        );
}