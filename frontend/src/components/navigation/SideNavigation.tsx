import styled from "@emotion/styled";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';

const Wrapper = styled(Box)`
    height:100%;
    max-width: 300px;
`;

export function SideNavigation() {
    return (
        <Wrapper>
            <nav>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText>ListItemText</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText>ListItemText</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText>ListItemText</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText>ListItemText</ListItemText>
                    </ListItem>
                </List>
            </nav>
        </Wrapper>
    )
}
